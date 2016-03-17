var numbArray ; 			//массив из чисел для ПУЗЫРЕЙ появляется после проверки
var count = 0;			  	//введёного массива функцией checkArray
var massAnswer = [];		//хранилище массива массивов хода сортировки
var sortedArray;            //остортированный массив(стандартной сортировкой)

//переопределение поиска по id на $
var $ = function(id) {		
	return document.getElementById(id);
};

var userArray = $( 'userArray' );
var check = $( 'check' );
var step = $( 'step' );
var reset = $( 'reset' );
var bubbles = $( 'bubbles' );
var obrazec = $( 'obrazec' );
var whatis = $( 'wtf' );
var quest = $( 'question' );
var close = $( 'close' );


whatis.addEventListener( 'click', whatisThis);
close.addEventListener( 'click', whatisThis );
check.addEventListener( 'click', checkArray );
step.addEventListener( 'click', stepForward );
reset.addEventListener( 'click', resetArray );

function whatisThis() {
    if(quest.classList.contains("nondisplay")) { //если окно скрыто
        quest.classList.remove("nondisplay");
        quest.classList.add("display");          //показать его

        whatis.style.backgroundImage = "url('./img/cancel.png')";

    } else {
        quest.classList.remove("display");      //если окно открыто
        quest.classList.add("nondisplay");      //закрыть

        whatis.style.backgroundImage = "url('./img/info_5320.png')";
    }
}

function isNumeric(n) {
	return !isNaN( parseFloat(n) ) && isFinite(n);
}

function checkArray() {
	var myArray = userArray.value.split( /\s*,\s*/ );
    var alrdSort = JSON.parse(JSON.stringify(myArray)).sort(compareNumb);
    sortedArray = alrdSort;
	if ( myArray.join(',') == alrdSort.join(',') && myArray.every( isNumeric )) { 
		alert('Массив уже отсортирован!');
		userArray.value = '';
	} else if( myArray.every( isNumeric ) ) {
		numbArray = myArray;

        //создает контейнеры для введённого массива
		for (var i = 0; i < numbArray.length; i++) {
			var div = document.createElement('div');
			div.className='divSimp';
			div.id = 'element' + i;
			obrazec.appendChild(div);
			div.innerHTML = numbArray[i];
		}

		//создает контейнеры для сортируемого массива
		for (var p = 0; p < numbArray.length; p++) {
			var divSorted = document.createElement('div');
			divSorted.className='divAns';
			divSorted.id = 'answer' + p;
			bubbles.appendChild(divSorted);
			divSorted.innerHTML = numbArray[p];
		}


		check.style.visibility = 'hidden';
		userArray.style.visibility = 'hidden';
		step.style.visibility = 'visible';
		reset.style.visibility = 'visible';

		bubbleSort();

	} else if( userArray.value === '' ) {
		alert('Введите числа!');
	} else {
		userArray.value = '';
		alert( 'Только числа!' );
	}
}

function compareNumb(a, b) {
	return a - b;
}

function resetArray() { 	
 	userArray.value = '';
 	numbArray = '';
    bubbles.innerHTML = '';
    obrazec.innerHTML = '';
 	count = 0;
 	massAnswer.length = 0;
    userArray.style.visibility = 'visible';
	check.style.visibility = 'visible';
	step.style.visibility = 'hidden';
	reset.style.visibility = 'hidden';
}

function bubbleSort() {
	var p =[];					//временный массив
    var tmp;					//буфер для обмена значениями
    var storage = '';			// временное хранилище массива массивов хода сортировки

  for (var i = numbArray.length - 1; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if (+numbArray[j] > +numbArray[j+1]) {

                tmp = numbArray[j];
                numbArray[j] = numbArray[j+1];
                numbArray[j+1] = tmp;

               storage += numbArray + ' ';
					p = storage.split(' ');
					p.splice(p.length-1, 1);
            }
        }
    }
    for(var t = 0; t < p.length; t++) {
 		massAnswer.push(p[t].split(',')); 	 //формирование массива массивов из строк сортировки
    }  
}

function stepForward() {
		if ( count < massAnswer.length) {
 			for (var i = 0; i < numbArray.length; i++) {
				var div = document.getElementById('answer' + i);
				div.innerHTML = massAnswer[count][i];
			}
            if (sortedArray.toString() === massAnswer[count].toString()) {
                alert('Массив отсортирован!');
            }
         count++;
        }
}

