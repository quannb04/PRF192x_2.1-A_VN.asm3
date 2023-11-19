'use strict'

//lấy DOM element
const inputUsername = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const submitBtn = document.getElementById('btn-submit');

//bắt sự kiện vào nút Login
submitBtn.addEventListener('click', function() {
  //kiểm tra ngườI dùng đã nhập đủ thông tin hay chưa
  const checkLogin = validata();
  if(checkLogin) {
    //tìm kiếm trong object userArr thông tin đăng nhập có đúng hay ko
    const login = userArr.find((arr) => 
    (arr.username === inputUsername.value &&
      arr.password === inputPassword.value));
    if(login) {
      //nhận 1 thông báo
      alert('Đăng nhập thành công!');
      //lưu vào local Storage
      saveToStorage('currentUser', login);
      //điều hướng về trang chủ
      window.location.href = '../index.html';
    } else {
      //đăng nhập không đúng, hiện về thông báo
      alert('Đăng nhập không thành công, vui lòng kiểm tra lại!')
    }
  }
})

// //hàm kiểm tra điều kiện nhập vào có trống hay ko
function validata() {
  let check = true;
  //kiểm tra không có trường nào bị bỏ trống
  if(inputUsername.value.trim().length === 0) {
    alert('Usename must input')
    check = false;
  }
  //phần password bỏ trim(), dấu cách cũng là 1 ký tự
  if(inputPassword.value.length === 0) {
    alert('Password must input')
    check = false;
  }
  return check;
}
