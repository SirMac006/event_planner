document.addEventListener('DOMContentLoaded', function () {
  function displayCurrentDate() {
      var currentDate = new Date();
      var options = { weekday: 'long', month: 'long', day: 'numeric' };
      var formattedDate = currentDate.toLocaleDateString('en-US', options);
      document.getElementById('currentDay').textContent = 'Today is ' + formattedDate;
  }

  function generateTimeBlocks() {
      var timeBlocks = document.getElementById('timeBlocks');

      for (var i = 9; i <= 17; i++) {
          var timeBlock = document.createElement('div');
          timeBlock.classList.add('time-block');
          timeBlock.setAttribute('data-hour', i);

          var hourDisplay = i > 12 ? i - 12 + ' PM' : i === 12 ? '12 PM' : i + ' AM';
          timeBlock.innerHTML = `<p>${hourDisplay}</p><textarea></textarea><button onclick="saveEvent(this)">Save</button>`;

          timeBlocks.appendChild(timeBlock);
      }
  }

  function updateBlockColors() {
      var currentTime = new Date().getHours();

      document.querySelectorAll('.time-block').forEach(function (block) {
          var blockHour = parseInt(block.getAttribute('data-hour'));

          if (blockHour < currentTime) {
              block.classList.add('past');
              block.classList.remove('present', 'future');
          } else if (blockHour === currentTime) {
              block.classList.add('present');
              block.classList.remove('past', 'future');
          } else {
              block.classList.add('future');
              block.classList.remove('past', 'present');
          }
      });
  }

  function loadSavedEvents() {
      document.querySelectorAll('.time-block').forEach(function (block) {
          var savedEvent = localStorage.getItem('event_' + block.getAttribute('data-hour'));

          if (savedEvent) {
              block.querySelector('textarea').value = savedEvent;
          }
      });
  }

  function saveEvent(button) {
      var block = button.closest('.time-block');
      var hour = block.getAttribute('data-hour');
      var eventText = block.querySelector('textarea').value;

      localStorage.setItem('event_' + hour, eventText);
  }

  // Initial setup
  displayCurrentDate();
  generateTimeBlocks();
  updateBlockColors();
  loadSavedEvents();

  // Set an interval to update block colors every minute
  setInterval(updateBlockColors, 60000);
});
