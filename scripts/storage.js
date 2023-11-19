'use strict'

//lưu dữ liệu xuống localStorage
function saveToStorage (key, value) {
  //localStorage chỉ lưu giá trị số, string hoặc boolean > JSON.stringify chuyển giá trị từ Object về string
  localStorage.setItem(key, JSON.stringify(value));
};

//lấy dữ liệu từ LocalStorage
function getFromStorage(key) {
  //chuyển giá trị đang đưỢc lưu ở localStorage từ string về Object
  return JSON.parse(localStorage.getItem(key));
};

//---------------------
//lấy dữ liệu user từ Storage
const users = (getFromStorage('userArr')) ? getFromStorage('userArr') : [];
//thực hiện chuyển đổi từ JS Object sang Class Instance
const userArr = users.map((user) => parseUser(user));

//---------------------
//lấy dữ liệu từ user đăng nhập
let currentUser = getFromStorage('currentUser') ? parseUser(getFromStorage('currentUser')) : null;

//---------------------
//lấy dữ liệu todo từ Storage
const todos = (getFromStorage('todoArr')) ? getFromStorage('todoArr') : [];
//thực hiện chuyển đổi từ JS Object sang Class Instance
const todoArr = todos.map((todo) => parseTask(todo));

//hàm chuyển user từ JS Object sang Class Instance
function parseUser(userData) {
	const user = new User(
    userData.firstName, 
    userData.lastName, 
    userData.username, 
    userData.password,
    //phần số 9: thay đổi thiết lập
    userData.pageSize,
    userData.category,)
	return user
}

//hàm chuyển task từ JS Object sang Class Instance: yêu cầu 8
function parseTask(taskData) {
	const task = new Task(
    taskData.task, 
    taskData.owner, 
    taskData.isDone)
	return task
}