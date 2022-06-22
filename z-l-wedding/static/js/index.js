/**
 * Main JS file for GhostScroll behaviours
 */

var $post = $(".post");
var $first = $(".post.first");
var $last = $(".post.last");
var $fnav = $(".fixed-nav");
var $postholder = $(".post-holder");
var $postafter = $(".post-after");
var $sitehead = $("#site-head");

/* Globals jQuery, document */
(function ($) {
  "use strict";
  function srcTo(el) {
    $("html, body").animate(
      {
        scrollTop: el.offset().top,
      },
      1000
    );
  }
  function srcToAnchorWithTitle(str) {
    var $el = $("#" + str);
    if ($el.length) {
      srcTo($el);
    }
  }
  $(document).ready(function () {
    $postholder.each(function (e) {
      if (e % 2 != 0) $(this).addClass("odd");
    });

    $postafter.each(function (e) {
      var bg = $(this).parent().css("background-color");
      $(this).css("border-top-color", bg);

      if (e % 2 == 0) {
        $(this).addClass("even");
      }
    });

    $("a.btn.site-menu").click(function (e) {
      srcToAnchorWithTitle($(e.target).data("title-anchor"));
    });
    $("#header-arrow").click(function () {
      srcTo($first);
    });

    $(".post.last").next(".post-after").hide();
    if ($sitehead.length) {
      $(window).scroll(function () {
        var w = $(window).scrollTop();
        var g = $sitehead.offset().top;
        var h = $sitehead.offset().top + $sitehead.height() - 100;
      });
    }

    $("ul li").before('<span class="bult fa fa-asterisk"></span>');
    $("blockquote p").prepend('<span class="quo fa fa-quote-left"></span>');
    $("blockquote p").append('<span class="quo fa fa-quote-right"></span>');
  });

  $post.each(function () {
    var postText = $(this).html();
    var fa = [];
    for (var i = 0; i < icons.length; i++) {
      fa[i] = {};
      fa[i].str = "@" + icons[i] + "@";
      fa[i].icon = icons[i];
      fa[i].int = postText.search(fa[i].str);

      if (fa[i].int > -1) {
        fa[i].count = postText.match(new RegExp(fa[i].str, "g")).length;
        for (var j = 0; j < fa[i].count; j++) {
          $(this).html(
            $(this)
              .html()
              .replace(fa[i].str, "<i class='fa " + fa[i].icon + "'></i>")
          );
        }
      }
    }
  });
})(jQuery);
