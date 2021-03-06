// .closest() polyfill
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest =
  function(s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i,
        el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {};
    } while ((i < 0) && (el = el.parentElement));
    return el;
  };
}

// accordion
function accordion() {
  
  var accHead = document.getElementsByClassName('js-acc-head');
  var accNextBtn = document.getElementsByClassName('js-acc-next');
  
  function closeAcc(el) {
    var accBody = el.parentElement.querySelector('.js-acc-body');
    accBody.style.height = 0;
    el.classList.remove('is-active');
  }
  
  function openAcc(el) {
    var accBody = el.parentElement.querySelector('.js-acc-body');
    var accBodyHeight = accBody.scrollHeight;
    accBody.style.height = accBodyHeight + 'px';
    el.classList.add('is-active');
  }
  
  for (var i = 0; i < accHead.length; i++) {
    accHead[i].addEventListener('click', function() {
      if (this.classList.contains('is-active')) {
        closeAcc(this);
      } else {
        for (var j = 0; j < accHead.length; j++) {
          closeAcc(accHead[j]);
        }
        openAcc(this);
      }
    });
  }
  
  for (var k = 0; k < accNextBtn.length; k++) {
    accNextBtn[k].addEventListener('click', function(e) {
      e.preventDefault();
      var currAcc = this.closest('.js-acc');
      var currAccHead = currAcc.querySelector('.js-acc-head');
      var nextAcc;
      if (currAcc.nextElementSibling && currAcc.nextElementSibling.classList.contains('js-acc')) {
        nextAcc = currAcc.nextElementSibling;
      } else {
        nextAcc = currAcc.parentElement.querySelector('.js-acc');
      }
      var nextAccHead = nextAcc.querySelector('.js-acc-head');
      closeAcc(currAccHead);
      openAcc(nextAccHead);
    });
  }
}

// popup
function popup() {
  
  var popupLink = document.getElementsByClassName('js-popup-link');
  var popupOverlay = document.getElementsByClassName('js-popup-overlay');
  var popupClose = document.getElementsByClassName('js-popup-close');
  
  function closePopup() {
    var popup = document.querySelector('.js-popup');
    popup.classList.remove('is-active');
    setTimeout(function() {
      popup.style.display = 'none';
    }, 300);
  }
  
  function openPopup() {
    var popup = document.querySelector('.js-popup');
    popup.style.display = 'block';
    setTimeout(function() {
      popup.classList.add('is-active');
    }, 10);
  }
  
  for (var i = 0; i < popupLink.length; i++) {
    popupLink[i].addEventListener('click', function(e) {
      e.preventDefault();
      openPopup();
    });
  }
  
  for (var j = 0; j < popupOverlay.length; j++) {
    popupOverlay[j].addEventListener('click', function(e) {
      e.preventDefault();
      closePopup();
    });
  }
  
  for (var k = 0; k < popupClose.length; k++) {
    popupClose[k].addEventListener('click', function(e) {
      e.preventDefault();
      closePopup();
    });
  }
}

// checkboxes
function checkboxes() {
  
  var checkBox = document.getElementsByClassName('js-check-box');
  
  for (var i = 0; i < checkBox.length; i++) {
    checkBox[i].addEventListener('change', function() {
      
      if (this.checked) {
        this.closest('.js-check-article').classList.add('is-selected');
      } else {
        this.closest('.js-check-article').classList.remove('is-selected');
      }
      
      var currArtBlock = this.closest('.js-check-block');
      var currArtCount = currArtBlock.querySelectorAll('.js-check-article.is-selected').length;
      var currArtSum = +currArtBlock.querySelector('.js-check-sum').textContent;
      var currArticles = currArtBlock.querySelectorAll('.js-check-article');
      
      currArtBlock.querySelector('.js-check-count').textContent = currArtCount;
      if (currArtCount === currArtSum) {
        for (var j = 0; j < currArticles.length; j++) {
          if (!currArticles[j].classList.contains('is-selected')) {
            currArticles[j].classList.add('is-disabled');
          }
        }
      } else {
        for (var j = 0; j < currArticles.length; j++) {
          currArticles[j].classList.remove('is-disabled');
        }
      }
      
      if (currArtCount > 0) {
        currArtBlock.classList.add('is-checked');
      } else {
        currArtBlock.classList.remove('is-checked');
      }
      
      var artBlocks = document.querySelectorAll('.js-check-block').length;
      var checkedArtBlocks = document.querySelectorAll('.js-check-block.is-checked').length;
      if (artBlocks === checkedArtBlocks) {
        document.querySelector('.js-check-ready').classList.remove('is-disabled');
      } else {
        document.querySelector('.js-check-ready').classList.add('is-disabled');
      }
    });
  }
}

function anchor() {
  
  var scrollTo = function(to, duration) {
    var element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startDate = +new Date(),
        // t = current time
        // b = start value
        // c = change in value
        // d = duration
        easeInOutQuad = function(t, b, c, d) {
          t /= d/2;
          if (t < 1) return c/2*t*t + b;
          t--;
          return -c/2 * (t*(t-2) - 1) + b;
        },
        animateScroll = function() {
          var currentDate = +new Date();
          var currentTime = currentDate - startDate;
          element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
          if(currentTime < duration) {
            requestAnimationFrame(animateScroll);
          }
          else {
            element.scrollTop = to;
          }
        };
    animateScroll();
  };
  
  var anchorLink = document.getElementsByClassName('js-anchor');
  
  for (var i = 0; i < anchorLink.length; i++) {
    anchorLink[i].addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.getElementById(this.hash.substring(1));
      scrollTo(target.offsetTop, 1000);
    });
  }
}

accordion();
popup();
checkboxes();
anchor();
