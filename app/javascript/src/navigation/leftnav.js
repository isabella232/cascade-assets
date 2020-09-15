const leftNav = function() {
  $(document).ready(function() {
    var $rootDrillDownNav   = $('#left-column-navigation .root-left-nav'),
    $rootElement            = $('#left-column-navigation'),
    tabableElements         = 'a[href], area[href], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]',
    nonTabableElements      = '[tabindex=-1], [disabled], :hidden',
    resizeTimer             = null;
  
    if (!$rootElement.length || !$rootElement) return;
  
    function drillMenuDown() {
      var $menuToDrillDownTo  = $(this).siblings('.drilldown-menu'),
      widthAmount             = $rootDrillDownNav.width(),
      ulCurrentPos            = getTranslateXVal($rootDrillDownNav),
      translateXVal           = ulCurrentPos - widthAmount;
  
      $menuToDrillDownTo.show();
      $rootDrillDownNav.css({ transform: "translateX(" + translateXVal + "px)"  });
  
      $rootElement.find('ul.active').removeClass('active');
      $menuToDrillDownTo.addClass('active');
      // SET ARIA DRILL DOWN EXPANDED
      $rootElement.find('.drilldown-menu').attr('aria-expanded', 'false');
      $rootDrillDownNav.attr('aria-expanded', 'false');
      $menuToDrillDownTo.attr('aria-expanded', 'true');
      
  
      $rootElement.css({ height: $menuToDrillDownTo.height() });
      
      $('html').scrollTop($('#left-column-navigation').offset().top - 120);
  
      return;
    }
  
   function drillMenuUp() {
      var widthAmount       = $rootDrillDownNav.width(),
      ulCurrentPos          = getTranslateXVal($rootDrillDownNav),
      translateXVal         = ulCurrentPos + widthAmount,
      $parentDrillDownMenu  = $(this).closest('.drill-down-list-item').closest('.drilldown-menu');
  
      $rootElement.find('ul.active').removeClass('active');
      !translateXVal ? $rootDrillDownNav.addClass('active') : $parentDrillDownMenu.addClass('active');
  
      $rootDrillDownNav.css({ transform: "translateX(" + translateXVal + "px)"  });
      $(this).parent().hide();
      // SET ARIA DRILL DOWN EXPANDED
      $rootElement.find('.drilldown-menu').attr('aria-expanded', 'false');
      $rootDrillDownNav.attr('aria-expanded', 'false');
      $parentDrillDownMenu.attr('aria-expanded', 'true');
  
      if (translateXVal >= 0) {
        $rootElement.css({ height: ($rootDrillDownNav.initialHeight) });
        $rootDrillDownNav.attr('aria-expanded', 'true');
        return;
      }
      
      $rootElement.css({ height: ($parentDrillDownMenu.height()) });
  
      $('html').scrollTop($('#left-column-navigation').offset().top - 120, 'slow');
  
      return;
    }
  
    function getTranslateXVal(selector) {
      var transformMatrix = selector.css("-webkit-transform") ||
                            selector.css("-moz-transform")    ||
                            selector.css("-ms-transform")     ||
                            selector.css("-o-transform")      ||
                            selector.css("transform");
      
      transformMatrix = transformMatrix === "none" ? 0 : transformMatrix;
  
      if (!isNaN(transformMatrix))
        return 0;
      
      var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
      var x = matrix[12] || matrix[4];//translate x
  
      return parseInt(x);
    }
  
    function moveOffCanvasToCurrentPathItem() {
      var currentPath = $rootDrillDownNav.find('li.current'),
      $currentPathDrillDownMenu = currentPath.parent('.drilldown-menu');
      $rootElement.show();
  
      if (currentPath.length) {
        var $drillDownParents = currentPath.parents('ul.drilldown-menu'),
        widthAmount           = $rootDrillDownNav.width();
  
        $drillDownParents.show();
        $rootDrillDownNav.css({ transform: "translateX(-" + (widthAmount * $drillDownParents.length) + "px" });
        $rootElement.css({ height: $currentPathDrillDownMenu.height() });
        $rootDrillDownNav.css({ transition: 'all .5s'});
  
        $rootDrillDownNav.initialHeight = $rootDrillDownNav.height();
  
        $currentPathDrillDownMenu.addClass('active');

        // SET ARIA DRILL DOWN EXPANDED
        $rootElement.find('.drilldown-menu').attr('aria-expanded', 'false');
        $rootDrillDownNav.attr('aria-expanded', 'false');
        $currentPathDrillDownMenu.attr('aria-expanded', 'true');
  
        return;
      }
  
      $rootElement.css({ height: $rootDrillDownNav.initialHeight });
  
      $('html').scrollTop($('#left-column-navigation').offset().top - 120);
  
      $rootDrillDownNav.initialHeight = $rootDrillDownNav.height();
      
      $rootDrillDownNav.addClass('active');
      return;
    }
  
    function resizeRootDrillDown() {
      var widthAmount       = $rootDrillDownNav[0].getBoundingClientRect().width,
      ulCurrentPos          = getTranslateXVal($rootDrillDownNav),
      $drillDownMenus       = $rootDrillDownNav.find('.drilldown-menu'),
      $drillDownMenuVisible = $rootDrillDownNav.find('.drilldown-menu[style*="display: block"]');
  
      $drillDownMenus.css({ left: widthAmount + "px" });
      $rootDrillDownNav.css({ transform: "translateX(-" + (!ulCurrentPos ? ulCurrentPos :  widthAmount * $drillDownMenuVisible.length) + "px"});
    }
  
    $rootDrillDownNav.on('click', '.drill-down-parent', drillMenuDown);
    
    $rootDrillDownNav.on('click', '.toggle-drilldown', drillMenuDown);
  
    $rootDrillDownNav.on('click', '.menu-back', drillMenuUp);
  
    // ACCESSIBILITY START //
  
    // LOOKS FOR FOCUS ON LEFT NAV ONLY FROM TABBING OR CLICKING FROM OTHER AREA THAN LEFT NAV
    $('body').on('focusin', '#left-column-navigation', function(e) {
      // FIXES ISSUE WHERE FOCUS IS ON FIRST LI OF MENU AND SHIFTS scrollTop MOVING MENU UP
      document.getElementById('left-column-navigation').scrollTop = 0;
  
      // USES RELATED TARGET TO IDENTIFIY IF FOCUS IS COMING FROM OUTSIDE ELEMENT OF LEFT NAV TO DETERMINE INITIAL FOCUS
      if (e.relatedTarget && !$(e.relatedTarget).parents('#left-column-navigation').length) {
        e.preventDefault();
  
        findSetLeftNavFocus(e);
      }
    });
  
    $('#twitter-widget-0').on('load', function() {
      $('#twitter-widget-0').contents().find('a').last().on('focusout', function(e) {
        e.preventDefault();
  
        var $drillDownFirstItem  = $rootDrillDownNav.find('.drilldown-menu.active').children('.menu-back');
  
        $drillDownFirstItem.length ? $drillDownFirstItem.focus() : $rootDrillDownNav.find('li').first().focus()
  
        return
  
      });
    });
  
    // DRILLS DOWN MENU ON ENTER OR SPACE BY ADDING LISTENER TO DRILL DOWN PARENT MENU LI
    $rootDrillDownNav.on('keydown', '.drill-down-parent', function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        var $nextTabableItem = $(this).siblings('.drilldown-menu').children('.menu-back')
        var drillDown = drillMenuDown.bind(this);
  
        drillDown();
  
        //REASON FOR SET TIMEOUT SEE THIS SO 
        //https://stackoverflow.com/questions/3580068/is-settimeout-with-no-delay-the-same-as-executing-the-function-instantly/3580703#3580703
        setTimeout(function() {
          $nextTabableItem.focus();
        },500);
        return;
      }
    });
  
    // DRILLS MENU BACK UP ON ENTER OR SPACE ON MENU BACK LI
    $rootDrillDownNav.on('keydown', '.menu-back', function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        var $nextTabableItem = $(this).closest('.drill-down-list-item').children('.drill-down-parent');
        var drillup = drillMenuUp.bind(this);
  
        drillup();
  
        //REASON FOR SET TIMEOUT SEE THIS SO 
        //https://stackoverflow.com/questions/3580068/is-settimeout-with-no-delay-the-same-as-executing-the-function-instantly/3580703#3580703
        setTimeout(function() {
          $nextTabableItem.focus();
        },500);
        return;
      }
    });
  
    // SELECTS FIRST ITEM IN THE FIRST MENU TO FIND PREVIOUS TABABLE ITEM IN HTML BEFORE LEFT NAV HIERARCHY ON SHIFT TAB
    Mousetrap(document.querySelector('.root-left-nav li.home-menu')).bind('shift+tab', function(e) {
      e.preventDefault();
      findPrevTabable();
    });
  
    // SELECTS FIRST ITEM IN THE DRILL DOWN MENU TO FIND PREVIOUS TABABLE ITEM IN HTML HIERARCHY ON SHIFT TAB
    $('.root-left-nav .menu-back').each(function(index) {
      Mousetrap(this).bind('shift+tab', function(e) {
        e.preventDefault();
        findPrevTabable();
      });
    });
  
    // SELECTS MAIN AND ALL DRILL DOWN MENUS TO ADD LISTENER TO LAST LI IN UL MENUS TO FIND NEXT TABABLE ELEMENT IN HTML HIERARCY AFTER LEFT NAV ON TAB
    $rootElement.find('ul').each(function(index) {
      $(this).children('li').last().on('keydown', function(e) {
        var keyCode = e.keyCode || e.which,
        parentActive = $(this).parent('ul').hasClass('active');
  
        if (keyCode === 9 && !e.shiftKey && parentActive) {
          e.preventDefault();
          findNextTabable();
        }
      })
    })
  
  
    function findSetLeftNavFocus(e) {
      e && e.stopPropagation();
      var $drillDownFirstItem  = $rootDrillDownNav.find('.drilldown-menu.active').children('.menu-back'),
      $drillDownLastItem       = $rootDrillDownNav.find('.drilldown-menu.active').children().last().children(tabableElements).not(nonTabableElements);
  
      // DETERMINES IF FOCUS IS COMING FROM MIDDLE CONTAINER OR BEFORE LEFT NAV IF SO SETS IT TO EITHER FIRST ITEM IN MENU OR DRILLED DOWN MENU
      if ($('.middleRightContainer').find(e.relatedTarget).length) {
        $drillDownFirstItem.length ? $drillDownFirstItem.focus() : $rootDrillDownNav.find('li').first().focus()
        return;
      }
  
      if ($('.breadcrumbs').find(e.relatedTarget).length) {
        $drillDownFirstItem.length ? $drillDownFirstItem.focus() : $rootDrillDownNav.find('li').first().focus()
        return;
      }
  
      // SETS FOCUS TO LAST ITEM IN FIRST MENU OR DRILLED DOWN MENU
      $drillDownLastItem.length ? $drillDownLastItem.focus() : $rootDrillDownNav.find('li').last().focus();
  
    }
  
    function findPrevTabable() {
      var $elem = $('.leftNav');
  
      // LOOPS THROUGH PREVIOUS HIERARCHIAL HTML ELEMENTS TO FIND PREVIOUS TABABLE ITEM
      $elem.prevAll().each(function(index) {
        // FIND METHOD LOOKS THROUGH ALL CHILDREN TO FIND TABABLE ELEMENTS
        var $prevTabableElement = $(this).find(tabableElements).not(nonTabableElements);
  
        if ($prevTabableElement.length) {
          $prevTabableElement.last().focus();
          return false;
        }
      });
    }
  
    function findNextTabable() {
      var focusedElement = false;
      // LOOPS THROUGH NEXT HIERARCHIAL HTML ELEMENTS IN LEFT NAV TO FIND NEXT TABABLE ITEM
      $rootElement.nextAll().each(function(index) {
        // FIND METHOD LOOKS THROUGH ALL CHILDREN TO FIND TABABLE ELEMENTS
        var $nextTabableElement = $(this).find(tabableElements).not(nonTabableElements);
  
        // IF ANY SETS FOCUS AND RETURNS FALSE TO END LOOP
        if ($nextTabableElement.length) {
          $nextTabableElement.first().focus();
          focusedElement = true;
          return false;
        }
      });
  
      if (focusedElement)
        return;
      
      // IF NO PREVIOUS FOCUS ITEMS FOUND WILL SEARCH NEXT HEIRARCHIAL TO LEFT NAV HTML ELEMENT FOR TABABLE ELEMENT
      $('.leftNav').nextAll().each(function(index) {
        var $nextTabableElement = $(this).find(tabableElements).not(nonTabableElements);
  
        if ($nextTabableElement.length) {
          $nextTabableElement.first().focus();
          focusedElement = true;
          return false;
        }
      });
  
      if (focusedElement)
        return;
  
      // IF NO PREVIOUS FOCUS ITEMS FOUND WILL SEARCH NEXT HEIRARCHIAL TO RIGHT NAV HTML ELEMENT FOR TABABLE ELEMENT
      $('.rightNav').nextAll().each(function(index) {
        var $nextTabableElement = $(this).find(tabableElements).not(nonTabableElements);
  
        if ($nextTabableElement.length) {
          $nextTabableElement.first().focus();
          focusedElement = true;
          return false;
        }
      });
  
      if (focusedElement)
        return;
  
      // IF NO PREVIOUS FOCUS ITEMS FOUND WILL SEARCH FOOTER HTML ELEMENT FOR TABABLE ELEMENT
      $('.footer__container').find(tabableElements).not(nonTabableElements).first().focus();  
  
      return;
  
    }
  
    // ACCESSIBILITY END //
  
    var checkResizeRootDrillDown = function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeRootDrillDown, 500);
    };
  
    $(window).resize(checkResizeRootDrillDown);
  
    moveOffCanvasToCurrentPathItem();
    resizeRootDrillDown();
  
  });
  
  $(window).on('load', function() {
    var $rootDrillDownNav   = $('#left-column-navigation .root-left-nav');
  
    // FINDING IFRAME TWITTER WIDGET AND ADDING HANDLER FOR 
    $('#twitter-widget-0').contents().find('a').last().on('keydown', function(e) {
      var keyCode = e.keyCode || e.which
      
      if (keyCode === 9) {
        e.preventDefault();
        var $drillDownFirstItem  = $rootDrillDownNav.find('.drilldown-menu.active').children('.menu-back');
  
        $drillDownFirstItem.length ? $drillDownFirstItem.focus() : $rootDrillDownNav.find('li').first().focus();
      }
  
      return;
    });
  
    $('#twitter-widget-0').on('load', function() {
      $('#twitter-widget-0').contents().find('a').last().on('keydown', function(e) {
        var keyCode = e.keyCode || e.which
  
        if (keyCode === 9) {
          e.preventDefault();
          var $drillDownFirstItem  = $rootDrillDownNav.find('.drilldown-menu.active').children('.menu-back');
      
          $drillDownFirstItem.length ? $drillDownFirstItem.focus() : $rootDrillDownNav.find('li').first().focus();
        }
        return;
      });
    });
  
  });  
}

export default leftNav;