'use strict'

//thông tin người dùng
class User {
  constructor(firstName, lastName, username, password,
  //nếu không khai báo, 2 phần này sẽ mặc định bằng có giá trị như bên dưới
  pageSize = 10, category = 'Business',
) {
    this.firstName = firstName; 
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    //phần số 9: thay đổi thiết lập
    this.pageSize = pageSize;
    this.category = category;
  }
}

//thông tin về Task trong Todo List
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  };
}