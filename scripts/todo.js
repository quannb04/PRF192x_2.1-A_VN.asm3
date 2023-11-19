'use strict'

//đảm bảo đang có tài khoản đang đăng nhập
if(currentUser) {
  //lấy DOM element
  const inputTask = document.getElementById('input-task');
  const btnAdd = document.getElementById('btn-add');
  const todoList = document.getElementById('todo-list');

  //hàm hiểm thị danh sách Todo List
  showTodoList();
  function showTodoList() {
    let html = '';
    //từ mảng todoArr lọc ra các todo (task) của user đang đăng nhập để hiển thị
    todoArr
      .filter((todo) => todo.owner === currentUser.username)
      .forEach(function(todo) {
        html += `
        <li class=${todo.isDone ? "checked" : ""}>${todo.task}<span class="close">×</span></li>
        `;    
      });
    todoList.innerHTML = html;
    //bắt các sự kiện
    //thông báo đã làm hay chưa làm
    eventToggleTasks();
    //xoá nhiệm vụ
    eventDeleteTask();
  }

  // bắt sự kiện nút add để thêm tasks
  btnAdd.addEventListener('click', function() {
    //kiểm tra người dùng nhập thông tin vào chưa
    if(inputTask.value.trim().length === 0) {
      alert(`Bạn chưa nhập nhiệm vụ mới!`)
    } else {
      const todo = new Task(
        inputTask.value,
        currentUser.username,
        false);
      //thêm task mới vào mảng todoArr
      todoArr.push(todo);
      //lưu xuống localStorage
      saveToStorage('todoArr', todoArr);
      //hiển thị lại các nhiệm vụ
      showTodoList();
      //xoá dữ liệu ở phần form nhập
      inputTask.value = '';
    }
  });
  
  //hàm bắt sự kiện toggle Task
  function eventToggleTasks() {
    //lất tất cả các phần tử li chứa các nhiệm vụ
    document.querySelectorAll('#todo-list li').forEach(function(liEl) {
      liEl.addEventListener('click', function(e) {
        //tránh nút xoá, tránh chồng sự kiện khi ấn nút delete
        if(e.target !== liEl.children[0]) {//chỉ đến thẻ span-thẻ con của li
          liEl.classList.toggle('checked');
          //thực hiện lưu các thay đổi
          const todo = todoArr.find((todoItem) => 
            todoItem.owner === currentUser.username &&
            todoItem.task === liEl.textContent.slice(0, -1)//lấy nội dung text chứa nhiệm vụ trừ đi dấu x - loại phần tử con cuối
          );
          //thay đổi thuộc tính isDone của nó
          todo.isDone = liEl.classList.contains('checked') ? true : false;
          // lưu dữ liệu xuống localStorage
          saveToStorage('todoArr', todoArr);
        }
      });
    });
  }

  //hàm bắt sự kiện xoá các Task
  function eventDeleteTask() {
    //lất tất cả các phần tử Delete, bắt sự kiện click trên từng phần tử đó
    document.querySelectorAll('#todo-list .close').forEach(function(closeEl) {
      closeEl.addEventListener('click', function() {
        //xác nhận xoá
        const deleteEl = confirm('Bạn chắc chắn muốn xoá sự kiện ?')
        if(deleteEl) {
          //tìm vị trí của Task được chọn xoá trong mảng todoArr
          const index = todoArr.findIndex((item) => 
          item.owner === currentUser.username && //xác nhận tên user và tên task
          item.task === closeEl.parentElement.textContent.slice(0, -1)//xác định tên task và so sánh
          );
          //xoá task khỏi mảng todoArr
          todoArr.splice(index, 1);
          // lưu dữ liệu xuống localStorage
          saveToStorage('todoArr', todoArr);
          //hiển thị lại list todo
          showTodoList();
        }
      });
    });
  }
  //nếu chưa đăng nhập thì yêu cầu đăng nhập
} else {
  alert(`Vui lòng đăng nhập/đăng ký để truy cập ứng dụng`);
  window.location.href = '../index.html';
}