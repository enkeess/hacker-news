const months =[
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

const addZero = (num) => {
	return num < 10 ? `0${num}` : `${num}`;
}

const getDate = (time) => {
	const date =  new Date(+(time + '000'));

	const day = addZero(date.getDate());
	const month = months[date.getMonth()];
	const year = date.getFullYear();

	const hours = addZero(date.getHours());
	const minuts = addZero(date.getMinutes());

	return `${hours}:${minuts}, ${day} ${month} ${year}`;
}

export default getDate;