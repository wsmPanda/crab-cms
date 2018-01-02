;(function ($) {
  var $coment = $('.comment-box')
  var $comentForm = $('.form-comment')
  var articleId = $coment.attr('data-id')
  $(document).on('ready', () => {
    updateComment(1)
  })
  $coment.on('click', '.pagination li[data-page]', function () {
    updateComment($(this).attr('data-page'))
  })
  $('.btn-comment').on('click', function () {
    $.link('/article/put/comments', {
      author: $comentForm.find('[name=author]').val(),
      content: $comentForm.find('[name=content]').val(),
      article_id: articleId
    }).then(res => {
      $comentForm.find('[name]').val(null)
      updateComment(1).then(() => {
        $coment[0].scrollIntoView()
      })
    })
  })

  function updateComment (page) {
    return $.link('/article/data/comments', {
      page,
      id: articleId
    }).then(res => {
      $.getTpl('articleCommnet').then((render) => {
        $coment.html(render(res))
      })
    })
  }
})(window.$)
