;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-yifuhuanfu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M1006.6432 151.213714c-0.036571 0 0.142629-0.071314 0.107886-0.107886L704.501029 33.678629c-1.749943-0.427886-3.392-1.106286-5.2864-1.106286-9.214171 0-17.106286 5.357714-20.821943 13.070629l-5.463771 10.071771C642.179657 112.427886 581.999543 146.285714 512 146.285714s-130.177829-33.857829-160.928914-90.570971l-6.036114-11.106743c-3.927771-7.036343-11.214629-12.035657-19.893029-12.035657-2.177829 0-4.072229 0.714971-6.070857 1.285486L17.393371 151.071086c0 0 0.213943 0.142629 0.1792 0.142629-10.357029 4.785371-17.536 15.285029-17.536 27.465143 0 0.036571-0.036571 0.071314-0.036571 0.107886l0 307.713829c0.963657 15.892114 13.856914 28.534857 29.928229 28.534857 4.178286 0 8.1792-0.8576 11.821714-2.3936 0.071314-0.036571 0.036571 0.071314 0.071314 0.071314L182.857143 456.572343l0 537.142857c0 16.749714 13.571657 30.2848 30.2848 30.2848l597.714286 0c16.714971 0 30.2848-13.535086 30.2848-30.2848L841.141029 456.285257l141.143771 56.464457c0.107886 0.036571 0.036571-0.142629 0.142629-0.107886 3.642514 1.536 7.643429 2.3936 11.821714 2.3936 15.786057 0 28.320914-12.178286 29.750857-27.642514L1024 177.464686C1023.535543 165.822171 1016.643657 155.821714 1006.6432 151.213714zM950.857143 421.429029l-150.213486-60.072229c-2.3936-0.786286-4.928-1.3568-7.572114-1.3568-13.714286 0-24.8576 11.106743-25.071543 24.786286L768 950.857143 256 950.857143 256 381.2864c-1.929143-11.964343-11.856457-21.2864-24.356571-21.2864-2.536229 0-4.893257 0.570514-7.213714 1.285486L73.142857 421.500343 73.142857 207.892114 304.1792 118.107429C350.857143 182.107429 426.357029 219.428571 512 219.428571s161.142857-37.321143 207.8208-101.321143L950.857143 207.892114 950.857143 421.429029z"  ></path>' +
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