'use strict'

//Tạo DOM element
const loginModal = document.getElementById('login-modal');
const welcomeMessage = document.getElementById('welcome-message');
const mainContent = document.getElementById('main-content');
const btnLogout = document.getElementById('btn-logout');

//Yêu cầu số 4: hàm thực hiện chức năng Home Page
displayHome();
function displayHome() {
  //nếu có người đăng nhập
  if(currentUser) {
    loginModal.style.display = 'none';
    mainContent.style.display = 'block'
    //hiển thị thông báo chào mừng
    welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
  } else {
    //nếu không có người đăng nhập
    loginModal.style.display = 'block';
    mainContent.style.display = 'none'
  }
}

//Yêu cầu số 5: Chức năng log-out
btnLogout.addEventListener('click', function() {
  alert('Bạn có chắc chắn muốn thoát!')
  //thực hiện xoá user hiện tại ở LocalStorage
  localStorage.removeItem("currentUser");
  //tải lại trang
  location.reload();
  // console.log(typeof currentUser);
  //chạy lại yêu cầu số 4
  displayHome();
  // loginModal.style.display = 'block';
  // mainContent.style.display = 'none'
})
// console.log(currentUser);