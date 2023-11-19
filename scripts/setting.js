'use strict'

//đảm bảo đang có tài khoản đang đăng nhập
if(currentUser) {
  //lấy DOM element
  const inputPageSize = document.getElementById('input-page-size');
  const inputCategory = document.getElementById('input-category');
  const btnSubmit = document.getElementById('btn-submit');
    
  //Gắn sự kiện vào Save setting
  btnSubmit.addEventListener('click', function() {
    if(validate) {
      //cập nhật lại curentUser
      currentUser.pageSize = Number.parseInt(inputPageSize.value);
      currentUser.category = inputCategory.value;
      //lưu lại dữ liệU tren localStorage
      saveToStorage('currentUser', currentUser);
      //cập nhật lại mảng userArr
      const index = userArr.findIndex((userItem) => 
       userItem.username === currentUser.username 
      );
      userArr[index] = currentUser;
      saveToStorage('userArr', userArr);
      //reset form nhập, thông báo cài đặt thành công, chuyển tới trang new
      inputPageSize.value = '';
      inputCategory.value = 'General';
      window.location.href = '../pages/news.html';
    }
  });
  
  //hàm validata dữ liệu người dùng nhập
  function validate() {
    let check = true;
    //kiểm tra thông tin nhập vào News per page
    if(Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert('Thông tin không hợp lệ, vui lòng nhập lại');
      check = false;
    }
    //ko cần kiểm tra inputCategory, nếu ko chọn mặc định General
    return check;
  }
} else {
  alert(`Vui lòng đăng nhập/đăng ký để truy cập ứng dụng`);
  window.location.href = '../index.html';
}