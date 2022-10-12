function emailIsValid(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function save() {
	let fullname = document.getElementById('fullname').value;
	let email = document.getElementById('email').value;
	let phonenumber = document.getElementById('phonenumber').value;
	let address = document.getElementById('address').value;
	let gender ='';
	if (document.getElementById('male').checked) {
    	gender = document.getElementById('male').value;
  } else if (document.getElementById('female').checked) {
    	gender = document.getElementById('female').value;
}
	if(_.isEmpty(fullname)) {
		fullname = '';
		document.getElementById('fullname-error').innerHTML = 'Vui lòng nhập tên!';
	} else if (fullname.trim().length <=2) {
		fullname = '';
		document.getElementById('fullname-error').innerHTML = 'Tên không được nhỏ như vậy';
	} else if (fullname.trim().length >30) {
		fullname = '';
		document.getElementById('fullname-error').innerHTML = 'Tên không được dài như vậy';
	} else {
		document.getElementById('fullname-error').innerHTML = '';
	}
	if(_.isEmpty(email)) {
		email = '';
		document.getElementById('email-error').innerHTML = 'Vui lòng nhập email!';
	} else if (!emailIsValid(email)) {
		email = '';
		document.getElementById('email-error').innerHTML = 'Sai định dạng email';
	} else {
		document.getElementById('email-error').innerHTML = '';
	}
	if(_.isEmpty(phonenumber)) {
		phonenumber = '';
		document.getElementById('phonenumber-error').innerHTML = 'Vui lòng nhập số điện thoại!';
	} else if (phonenumber.trim().length > 10) {
		phonenumber = '';
		document.getElementById('phonenumber-error').innerHTML = 'Số điện thoại không đúng';
	} else if (phonenumber.trim().length < 10) {
		phonenumber = '';
		document.getElementById('phonenumber-error').innerHTML = 'Số điện thoại không đúng';
	} else {
		document.getElementById('phonenumber-error').innerHTML = '';
	}
	if(_.isEmpty(address)) {
		address = '';
		document.getElementById('address-error').innerHTML = 'Vui lòng nhập địa chỉ!';
	} else {
		document.getElementById('address-error').innerHTML = '';
	}
	if(_.isEmpty(gender)) {
		document.getElementById('gender-error').innerHTML = 'Vui lòng chọn giới tính';
	} else {
		document.getElementById('gender-error').innerHTML = '';
	}

	if (fullname && email && phonenumber && address && gender) {
		let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []; 

		students.push({
			fullname: fullname,
			email: email,
			phonenumber: phonenumber,
			address: address,
			gender: gender,
		});

		localStorage.setItem('students', JSON.stringify(students))
		this.renderListStudent();
	}
}

function renderListStudent() { 
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []; 
	
	if (students.length === 0) {
		document.getElementById('list-student').style.display = 'none';
		return false;
	}

	document.getElementById('list-student').style.display = 'block';
	
	let tableContent = `<tr>
		<td width='20'>STT</td>
		<td width='550'>Họ và tên</td>
		<td width='250'>Địa chỉ email</td>
		<td width='100'>Điện thoại</td>
		<td width='100'>Giới tính</td>
		<td width='200'>Địa chỉ</td>
		<td>Ghi chú</td></tr>`;

	students.forEach((student, index) => {
				let studentId = index;
				let genderLabel = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';
 				index++;

 				tableContent += `<tr>
					<td>${index}</td>
					<td>${student.fullname}</td>
					<td>${student.email}</td>
					<td>${student.phonenumber}</td>
					<td>${genderLabel}</td>
					<td>${student.address}</td>
					<td>
						<a href ='#' onclick='editStudent(${studentId})'> Edit </a> | <a href ='#' onclick='deleteStudent(${studentId})'> Delete </a>
				</td>
			</tr>`;
		})

		document.getElementById('grid-students').innerHTML = tableContent;
}

function deleteStudent(id) {
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []; 
	students.splice(id, 1);
	localStorage.setItem('students',JSON.stringify(students));
	renderListStudent();
}

function clear (){
	document.getElementsByTagName('id').value="";
}

function editStudent(id) {
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []; 
	document.getElementById('fullname').value=students.fullname;
	document.getElementById('email').value=students.email;
	document.getElementById('phonenumber').value=students.phonenumber;
	document.getElementById('address').value=students.address;
	document.getElementById('gender').value=students.gender;
	localStorage.setItem('students',JSON.stringify(students));
	renderListStudent();
}