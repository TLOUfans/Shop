;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-duoyun" viewBox="0 0 2048 1024">' +
    '' +
    '<path d="M367.591619 723.968H224.621714c-93.184 0-169.008762-76.995048-169.008762-171.641905 0-94.695619 75.824762-171.715048 169.008762-171.715047 6.217143 0 13.019429 0.487619 21.406476 1.536l27.501715 3.462095 2.730666-27.843048c17.017905-170.105905 156.91581-298.374095 325.485715-298.374095 73.216 0 142.311619 25.258667 198.095238 68.510476a480.49981 480.49981 0 0 1 37.936762-38.912C771.559619 35.864381 688.615619 4.681143 601.770667 4.681143c-188.220952 0-344.673524 134.460952-375.808 321.243428h-1.340953c-123.026286 0-223.134476 101.571048-223.134476 226.401524 0 124.806095 100.10819 226.352762 223.134476 226.352762h144.237715a308.272762 308.272762 0 0 1-2.169905-34.523428c0-6.826667 0.438857-13.507048 0.902095-20.187429zM1701.595429 326.460952c-24.015238 0-47.957333 2.584381-71.363048 7.753143C1555.382857 158.329905 1380.717714 41.033143 1191.740952 41.033143c-235.836952 0-431.957333 168.545524-470.991238 402.602667h-1.657904c-154.233905 0-279.673905 127.317333-279.673905 283.745523 0 156.452571 125.44 283.721143 279.649524 283.721143h982.552381c186.002286 0 337.334857-153.575619 337.334857-342.308571 0-188.757333-151.332571-342.308571-337.334857-342.308572z m269.482666 342.332953c0 150.942476-120.905143 273.724952-269.482666 273.724952h-982.552381c-116.784762 0-211.846095-96.475429-211.846096-215.137524 0-118.637714 95.036952-215.161905 211.870477-215.161904 7.753143 0 16.286476 0.609524 26.819047 1.926095l34.425905 4.315428 3.486476-34.913523c21.284571-213.187048 196.656762-373.955048 407.893333-373.955048 172.860952 0 327.972571 111.37219 386.048 277.065143l10.947048 31.305143 31.256381-10.093715a266.971429 266.971429 0 0 1 81.65181-12.8c148.577524 0 269.482667 122.782476 269.482666 273.724953z" fill="#9AB8D4" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)