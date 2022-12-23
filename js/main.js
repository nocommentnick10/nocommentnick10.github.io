// Parallax

var scene = document.getElementById('contacts');
var parallax = new Parallax(scene);

// MixItUp

$(document).ready(function () {

	let containerEl = document.querySelector("#mix-cards");

	let mixer = mixitup(containerEl, {
		classNames: {
			block: ""
		}
	});

});

// BackTopBtn

const backBtn = document.querySelector("#backbtn");

document.addEventListener('scroll', function () {
	if (window.pageYOffset > 300) {
		backBtn.classList.remove('none');
	} else {
		backBtn.classList.add('none');
	}
});

// OnePageNav

const oneNav = document.querySelector('#nav');

$('#nav').onePageNav({
	currentClass: 'current',
	changeHash: false,
	scrollSpeed: 750,
	scrollThreshold: 0.5,
	filter: '',
	easing: 'swing'
});

// MobileNav

const navIcon = document.querySelector('.nav-m');
const nav = document.querySelector('.nav');
const overlay = document.querySelectorAll('.overlay');

navIcon.addEventListener('click', function () {
	this.classList.toggle('nav-m--active');
	nav.classList.toggle('nav--active');
	oneNav.classList.toggle('none');
	document.querySelector('.body').classList.toggle('no-scroll');
	overlay.forEach(function (item) {
		item.classList.toggle('overlay--active');
	});
	// if (backBtn.classList.contains('none')){

	// } else {
	// 	backBtn.classList.add('none');
	// }

	if (navIcon.classList.contains('nav-m--active')) {
		backBtn.classList.add('none');
	}
});

document.addEventListener('scroll', function () {

	if (navIcon.classList.contains('nav-m--active')) {
		backBtn.classList.add('none');
	}

});

// Находим ссылки внутри мобильной навигации
const navLinks = document.querySelectorAll('.nav a');

// Обходим ссылки методом forEach
navLinks.forEach(function (item) {
	// Для каждой ссылки добавляем прослушку по событию "Клик"
	item.addEventListener('click', function () {
		navIcon.classList.remove('nav-m--active'); // Убираем активный класс у иконки моб. навигации
		nav.classList.remove('nav--active'); // Убираем активный класс у блока моб. навигации
		document.querySelector('.body').classList.remove('no-scroll');
		oneNav.classList.toggle('none');
		overlay.forEach(function (itemOv) {
			itemOv.classList.toggle('overlay--active');
		});
	})
});

window.addEventListener('resize', function () {
	navIcon.classList.remove('nav-m--active');
	nav.classList.remove('nav--active');
	document.querySelector('.body').classList.remove('no-scroll');
	oneNav.classList.remove('none');
	overlay.forEach(function (itemOv) {
		itemOv.classList.remove('overlay--active');
	});
});

// initializeAos

AOS.init();

//   Form

const formItems = document.querySelectorAll('.form-item__form-field');

for (let formItem of formItems) {
	const itemParent = formItem.closest('.form-item');
	const itemPlaceholder = itemParent.querySelector('.form-item__fake-placeholder');

	// Если инпут в фокусе

	formItem.addEventListener('focus', function () {
		itemPlaceholder.classList.add('form-item__fake-placeholder--active');
	});

	// Если инпут теряет фокус

	formItem.addEventListener('blur', function () {

		if (formItem.value.length > 0) {
			itemPlaceholder.classList.add('form-item__fake-placeholder--active');
		} else {
			itemPlaceholder.classList.remove('form-item__fake-placeholder--active');
		}

	});
}

// jQuery Validate

$('.contacts-form').validate({
	rules: {
		email: {
			required: true,
			email: true
		},

		message: {
			required: true
		}
	},

	messages: {
		email: {
			required: 'Введите email',
			email: 'Введите корректный email'
		},

		message: {
			required: 'Поле не должно быть пустым'
		}
	},

	submitHandler: function (form) {
		ajaxFormSubmit();
	}
});

// Функция AJAX запрса на сервер

function ajaxFormSubmit() {

	let string = $(".contacts-form").serialize(); // Соханяем данные введенные в форму в строку.

	//Формируем ajax запрос
	$.ajax({
		type: "POST", // Тип запроса - POST
		url: "php/mail.php", // Куда отправляем запрос
		data: string, // Какие даные отправляем, в данном случае отправляем переменную string

		// Функция если все прошло успешно
		success: function (html) {
			$(".contacts-form").slideUp(800);
			$('#answer').html(html);
		}
	});
	// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
	return false;
}

// Прокрутка по ссылке

document.querySelectorAll('a.linkFor').forEach(link => {

	link.addEventListener('click', function(event){
		
		event.preventDefault();

		const href = this.getAttribute('href').substring(1);

		const scrollTarget = document.getElementById(href);

		const topOffset = document.querySelector('.header-top').clientHeight-30;
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;

		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth'
		})

	});

});

document.querySelectorAll('a.linkForMobile').forEach(link => {

	link.addEventListener('click', function(event){
		
		event.preventDefault();

		const href = this.getAttribute('href').substring(1);

		const scrollTarget = document.getElementById(href);

		const topOffset = document.querySelector('.header-top').clientHeight;
		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;

		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth'
		})

	});

});

// FancyBox

Fancybox.bind("[data-fancybox]", {
	infinite: false,
	Carousel: {
		Dots: true
	},
	Toolbar: false,
  	Thumbs: false,
	closeButton: "outside"
  });

