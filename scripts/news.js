'use strict'

//đảm bảo đang có tài khoản đang đăng nhập
if(currentUser) {
  //lấy DOM element
  const newsContainer = document.getElementById('news-container');
  const btnNext = document.getElementById('btn-next');
  const btnPrev = document.getElementById('btn-prev');
  const pageNum = document.getElementById('page-num');

  let totalResults = 0;
  let lengthArticles = 0;

  //Hàm lấy dữ liệu từ API, hiển thị list news ra ứng dụng
  getDataNews('us', 1)
  async function getDataNews(country, page) {
    try {
      //kết nối API và lấy dữ liệu
      const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=3f9719771bb5405e8a7d721cb0c9c9fd`);
      console.log(res);
      //để lấy được body ta sử dụng phương thức có sẵn trên các response của phương thức fetch là json
      const data = await res.json();
      console.log(data);
      //bắt lỗi khi chạy tập tin không thông qua Live Server
      if(data.status === 'error' && data.code === 'corsNotAllowed') {
        throw new Error(data.message);
      }

      //gọi hàm hiển thị list item
      displayNewList(data);
      
      //bắt lỗi
    }  catch(err) {
      alert('Error:  ' + err.message);
    }
  }

  //hàm hiển thị list News trên trang
  function displayNewList(data) {
    //lấy giá trị cho biến totalResults
    totalResults = data.totalResults;
    lengthArticles = data.articles.length;
    // console.log(totalResults, lengthArticles);
    // console.log(currentUser.category);

    //kiểm tra điều kiện ẩn, hiện các nút Previous và Next
    checkPrevious();
    checkNext();
    //hiển thị các kết quả
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

  //hàm kiểm tra điều kiện ẩn nút Next
  function checkNext() {
    //thực hiện so sánh kết quả trả về với tổng số kết quả
    //C1:pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize) nếu pagenumber bằng với làm tròn lên của tổng số kq/số kq hiển thị trên trang (so sánh lỏng lẻo giữa string và number) (ceil/floor)
    //C2: 
    if(lengthArticles < currentUser.pageSize) {
      btnNext.style.display = 'none';
    } else {
      btnNext.style.display = 'block';
    } 
  }
  // console.log(totalResults, (${pageSize}))
  
  //bắt sự kiện khi kích vào nút Previous
  btnPrev.addEventListener('click', function() {
    //lấy danh sách dữ liệu và hiển thị danh sách các New trước đó
    getDataNews('us', --pageNum.textContent);
  })
  //bắt sự kiện khi kích vào nút Next
  btnNext.addEventListener('click', function() {
    //lấy danh sách dữ liệu và hiển thị danh sách các New trước đó
    getDataNews('us', ++pageNum.textContent);
  })
  //nếu chưa đăng nhập thì yêu cầu đăng nhập
} else {
  alert(`Vui lòng đăng nhập/đăng ký để truy cập ứng dụng`);
  window.location.href = '../index.html';
}