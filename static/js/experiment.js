// Generated by CoffeeScript 2.6.1
/*
experiment.coffee
Fred Callaway

Demonstrates the mouselab-mdp jspsych plugin

*/
var checkWindowSize, initializeExperiment, loadJson;

// coffeelint: disable=max_line_length, indentation

// Enforce a minimum window size
checkWindowSize = function(width, height, display) {
  var maxHeight, win_width;
  console.log('cws');
  win_width = $(window).width();
  maxHeight = $(window).height();
  if ($(window).width() < width || $(window).height() < height) {
    display.hide();
    return $('#window_error').show();
  } else {
    $('#window_error').hide();
    return display.show();
  }
};

$(window).resize(function() {
  return checkWindowSize(800, 600, $('#jspsych-target'));
});

$(window).resize();

loadJson = function(file) {
  var result;
  result = $.ajax({
    dataType: 'json',
    url: file,
    async: false
  });
  return result.responseJSON;
};

$(window).on('load', function() {
  var trials;
  trials = loadJson("static/json/trials.json");
  return initializeExperiment(trials);
});

initializeExperiment = function(trials) {
  var experiment_timeline, i, main, trial, welcome;
  console.log('INITIALIZE EXPERIMENT');
  console.log(trials);
  //  ============================== #
  //  ========= EXPERIMENT ========= #
  //  ============================== #
  welcome = {
    type: 'text',
    text: `<h1>Mouselab-MDP Demo</h1>

This is a demonstration of the Mouselab-MDP plugin.
<p>
Press <b>space</b> to continue.
`
  };
  trial = {
    type: 'mouselab-mdp', // use the jspsych plugin
    // ---------- MANDATORY PARAMETERS ---------- #
    graph: { // defines transition and reward functions
      B: { // for each state, an object mapping actions to [reward, nextState]
        up: [
          5,
          'A' // states may be strings or numbers (be consistent!)
        ],
        down: [-5, 'C']
      },
      A: {},
      C: {}
    },
    layout: { // defines position of states
      A: [0, 1],
      B: [0, 2],
      C: [0, 3]
    },
    initial: 'B', // initial state of player
    // ---------- OPTIONAL PARAMETERS ---------- #
    stateLabels: { // object mapping from state names to displayed labels
      A: 'A',
      B: 'B',
      C: 'C'
    },
    stateDisplay: 'always', // one of 'never', 'hover', 'click', 'always'
    stateClickCost: 0, // subtracted from score every time a state is clicked
    edgeLabels: 'reward', // object mapping from edge names (s0 + '__' + s1) to labels
    edgeDisplay: 'click', // one of 'never', 'hover', 'click', 'always'
    edgeClickCost: 1, // subtracted from score every time an edge is clicked
    stimId: 1994, // for your own data-keeping
    playerImage: 'static/images/nina.png',
    playerImageScale: 0.3,
    size: 120, // determines the size of states, text, etc...
    leftMessage: 'Left Message',
    centerMessage: 'Center Message'
  };
  i = 0;
  //trials.push trial
  main = {
    type: 'mouselab-mdp',
    leftMessage: function() {
      return `Round: ${++i}/${trials.length}`;
    },
    timeline: trials
  };
  // welcome
  experiment_timeline = [main];
  // ================================================ #
  // ========= START AND END THE EXPERIMENT ========= #
  // ================================================ #
  return jsPsych.init({
    display_element: $('#jspsych-target'),
    timeline: experiment_timeline,
    // show_progress_bar: true
    on_finish: function() {
      return jsPsych.data.displayData();
    },
    on_data_update: function(data) {
      return console.log('data', data);
    }
  });
};