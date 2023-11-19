'use strict'

//đảm bảo đang có tài khoản đang đăng nhập
if(currentUser) {
  //lấy DOM element
  const inputQuery = document.getElementById('input-query');
  const btnSubmit = document.getElementById('btn-submit');
  const newsContainer = document.getElementById('news-container');
  const btnPrev = document.getElementById('btn-prev');
  const pageNum = document.getElementById('page-num');
  const btnNext = document.getElementById('btn-next');
  const navPageNum = document.getElementById('nav-page-num');
  
  let totalResults = 0;
  let lengthArticles = 0;
  let keywords = 0;
  navPageNum.style.display = 'none';
  
  //gắn sự kiện vào nút Search
  btnSubmit.addEventListener('click', function() {
    pageNum.textContent = '1';
    newsContainer.innerHTML = '';
    //check người dùng nhập thông tin chưa
    if(inputQuery.value.trim().length === 0) {
      alert('Nhập thông tin tìm kiếm tại đây');
      //ẩn các nút chuyển trang
      navPageNum.style.display = 'none';
    } else {
      keywords = inputQuery.value;
      //gọi hàm hiển thị
      results(keywords, 1);
    }
  });

  //hàm bất đồng bộ để lấy dữ liệu tin tức được tìm kiếm từ từ khoá nhập vào
  async function results(keywords, page) {
    try {
      const res = await fetch(`https://newsapi.org/v2/everything?q=${keywords}&sortBy=popularity&pageSize=${currentUser.pageSize}&page=${page}&apiKey=3f9719771bb5405e8a7d721cb0c9c9fd`);
      const data = await res.json();
      //nếu ko có bài viết nào thì thông báo
      if(data.totalResults == 0) {
        //ẩn các nút chuyển trang
        navPageNum.style.display = 'none';
        throw new Error('Không có kết quả, vui lòng nhập từ khoá khác');
      }
      //bắt lỗi khi chạy tập tin không thông qua Live Server console.log >>> code
      if(data.status === 'error' && data.code === 'corsNotAllowed') {
        throw new Error(data.message);
      }
      //hiển thị các nút chuyển trang nếu có dữ liệu
      navPageNum.style.display = 'block';
      console.log(data);
      //gọi hàm hiển thị list item
      displayNewList(data);
      // console.log(displayNewList(data));
      //bắt lỗi
    } catch(err) {
      alert('Error:  ' + err.message);
    }
  }

  //hàm hiển thị list News trên trang
  function displayNewList(data) {
    //lấy giá trị cho biến totalResults
    totalResults = data.totalResults;
    // lengthArticles = data.articles.length;
    // console.log(totalResults, lengthArticles);
    // console.log(currentUser.category);
    //kiểm tra điều kiện ẩn, hiện các nút Previous và Next
    checkPrevious();
    checkNext();
    //hiển thị thông tin tìm kiếm
    let html = '';
    data.articles.forEach(function(article) {
      html += `
      <div class="card flex-row flex-wrap" style="padding: 30px">
        <div class="col-md-4">
          <img class="card-img" src=${article.urlToImage ? article.urlToImage : '../No-Image-Found-400x264.png'} alt="img" />
        </div>
        <div class="col-md-8">
          <h4>${article.title}</h4>
          <h5>${article.description}</h5>
          <a href="${article.url}" target="_blank" class=" btn btn-primary">View more</a>
        </div>
      </div>
      `;
    });
    newsContainer.innerHTML = html;
  }
  
  //hàm kiểm tra điều kiện ẩn nút Previous
  function checkPrevious() {
    //nếu pagenumber = 1 thì ẩn (so sánh lỏng lẻo giữa string và number)
    if(pageNum.textContent == 1) {
      btnPrev.style.display = 'none';
    } else {
      btnPrev.style.display = 'block';
    } 
  }

  //hàm kiểm tra điều kiện ẩn nút Next (so sánh với tổng số kết quả trả về)
  function checkNext() {
    //C1: pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize) nếu pagenumber bằng với làm tròn lên của tổng số kq/số kq hiển thị trên trang (so sánh lỏng lẻo giữa string và number) (ceil/floor)
    //C2: 
    if(lengthArticles < currentUser.pageSize) {
      btnNext.style.display = 'none';
    } else {
      btnNext.style.display = 'block';
    } 
  }

  //bắt sự kiện khi kích vào nút Previous
  btnPrev.addEventListener('click', function() {
    //lấy danh sách dữ liệu và hiển thị danh sách các New trước đó
    results(keywords, --pageNum.textContent);
  })
  //bắt sự kiện khi kích vào nút Next
  btnNext.addEventListener('click', function() {
    //lấy danh sách dữ liệu và hiển thị danh sách các New trước đó
    results(keywords, ++pageNum.textContent);
  })  
} else {
  alert(`Vui lòng đăng nhập/đăng ký để truy cập ứng dụng`);
  window.location.href = '../index.html';
}
