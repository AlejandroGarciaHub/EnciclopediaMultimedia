(function() {

  var myInterval;

  var questions = [{
    question: "El morphing se define como:",
    choices: ['Una animación', 'Transformación de técnicas', 'Modelo de animación', 'Forma humana'],
    correctAnswer: 1
  }, {
    question: "La rotoscopia es una técnica de:",
    choices: ['Dibujo', 'Animación simple', 'Morphing', 'Animación por computador'],
    correctAnswer: 3
  }, {
    question: "Este tipo de animación consiste en describir el movimiento de forma algorítmica:",
    choices: ['Warping', 'Procedural', 'Inversa', 'Paso a paso'],
    correctAnswer: 1
  }, {
    question: "Existen 2 categorias de morphing, ¿cuales son?",
    choices: ['Retracción y malformación','Manipulación','Distorsión y transición','Inversa y normal'],
    correctAnswer: 2
  },{
    question: "Consiste en comprimir o expandir una imagen:",
    choices: ['Tweening','Warping','Animación 3D','Rotoscopia'],
    correctAnswer: 1
  },{
    question: "Significa insertar partes o cosas entre dos partes:",
    choices: ['Tweening','Warping','Animación 3D','Rotoscopia'],
    correctAnswer: 0
  }, {
    question: "En que consiste la animación por cotas:",
    choices: ['En eliminar redundancia de la imagen','En sobreponer dos o mas imagenes','En basar el movimiento en unos fotogramas fundamentales ("keyframes")','En convertir una imagen a escala de grises'],
    correctAnswer: 2
  }, {
    question: "La animación por ordenador permite:",
    choices: ['Ahorrar tiempo al animar','Representar modelos que evolucionan a lo largo del tiempo','Fusionar modelos 2D y 3D','Crear morphing'],
    correctAnswer: 1
  }, {
    question: "¿En que año se realizó la primera animación?",
    choices: ['1972','1973','1985','1998'],
    correctAnswer: 0
  }, {
    question: "¿Cuál fue la primer película animada con efectos de tres dimensiones?",
    choices: ['Toy Story','Cars','El rey león','Shrek'],
    correctAnswer: 0
  }, {
    question: "Este tipo de morphing utiliza solamente una imagen:",
    choices: ['Distorsión','Transición','Inclusión','Formación'],
    correctAnswer: 0
  }, {
    question: "Este efecto transforma una imagen en otra utilizando puntos de metamorfosis o líneas de metamorfosis:",
    choices: ['Warping','Rendering','Tweening','3D'],
    correctAnswer: 0
  }, {
    question: "¿Cuál de estos software permite crear una animación por cuadros clave?",
    choices: ['Paint','Adobe Flash','GIMP','Image Designer'],
    correctAnswer: 1
  }, {
    question: "Esta cinemática se origina a partir del grado de rotación de las articulaciones:",
    choices: ['Inversa','Directa'],
    correctAnswer: 0
  }, {
    question: "¿Que estudia la dinámica?",
    choices: ['El movimiento teniendo en cuenta las fuerzas que lo producen', 'La distribución de los fotogramas', 'El morphing', 'Todas las anteriores'],
    correctAnswer: 0
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('¡Selecciona una respuesta!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
    var tiempo = document.querySelector('#header-time');
    var fiveMinutes = 60*10,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Pregunta ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p><span style="font-size:2em;">*</span>').append(questions[index].question+'<hr>');
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li style="margin-bottom:2%;">');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    myInterval=setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
          clearInterval(myInterval)
            var scoreElem = displayScore();
            quiz.append(scoreElem).fadeIn();
            $('#question').remove();
            var restante = document.querySelector('#time').value;
            console.log(restante);

            $('#next').hide();
            $('#prev').hide();
            $('#start').show();
        }
    }, 1000);
  }

  window.onload = function () {
  var fiveMinutes = 60*10,
      display = document.querySelector('#time');
  startTimer(fiveMinutes, display);
};

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      console.log('Ciclo');
      console.log(selections[i]);
      console.log(questions[i].correctAnswer);
      if (selections[i] == questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    var porcentaje=(100*numCorrect)/questions.length;
    porcentaje=Math.round(porcentaje)
    var equivocadas=15-numCorrect
    score.append('<br>- CORRECTAS: ' + numCorrect + '<br> - EQUIVOCADAS: '+equivocadas+'<hr>Porcentaje de calificación: '+porcentaje+'%');
    clearInterval(myInterval)
    var restante = document.querySelector('#time').innerText;
    console.log(restante);

    $('#next').hide();
    $('#prev').hide();
    $('#start').show();
    return score;
  }
})();
