'use strict'

//lấy DOM element
const inputFirstname = document.getElementById('input-firstname');
const inputLastname = document.getElementById('input-lastname');
const inputUsername = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const inputConfirmPw = document.getElementById('input-password-confirm');
const submitBtn = document.getElementById('btn-submit');

//Bắt sự kiện vào nút register
submitBtn.addEventListener('click', function() {
  //lấy dữ liệu nhập vào từ người dùng
  const user = new User(
    inputFirstname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value,
  );
  console.log(user);
  const checkUser = validata(user)
  //thông tin người dùng nhập thoả mãn các điều kiện
  if(checkUser) {
    //thêm dữ liệu
    userArr.push(user);
    //lưu danh sách thú cưng vào LocalStorage
    saveToStorage('userArr', userArr);
    alert('Bạn đã đăng ký thành công!')
    //điều hướng sang trang login
    window.location.href = '../pages/login.html';
  }
})

//hàm kiểm tra điều kiện nhập vào
function validata(user) {
  let check = true;
  //kiểm tra không có trường nào bị bỏ trống
  if(user.firstName.trim().length === 0) {
    alert('Firstname must input')
    check = false;
  }
  if(user.lastName.trim().length === 0) {
    alert('Lastname must input')
    check = false;
  }
  if(user.username.trim().length === 0) {
    alert('Username must input')
    check = false;
  }
  //username không được trùng vs username đã tồn tại
  userArr.forEach((arr) => (user.username === arr.username ?
    (alert('Username đã tồn tại'), check = false): check = true));
  //trong forEach ko có break
  // for(let i = 0; i < userArr.length; i++) {
  //   if(user.username === userArr[i].username) {
  //     alert('Username đã tồn tại');
  //     check = false;
  //     break; //kiểm tra trùng 1 lần là dừng, username ko có 2 lần trùng
  //   }
  // }
  //password lớn hơn 8 ký tự, bỏ trim(), dấu cách cùng là 1 ký tự
  if(user.password.length <= 8) {
    alert('Password phải lớn hơn 8 ký tự')
    check = false;
  }
  //mật khẩu và xác nhận mật khẩu phải giống nhau
  if(user.password !== inputConfirmPw.value) {
    alert('Xác nhận mật khẩu không giống')
    check = false;
  }
  return check;
}