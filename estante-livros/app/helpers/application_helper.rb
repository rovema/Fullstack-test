module ApplicationHelper
  def flash_message
    notification = ''
    %i[success info warning error].each do |type|
      next unless flash[type]

      notification += "<script>
          swal({
            title: '#{flash[type]}',
            icon: '#{type}',
          });
      </script>"
    end
    notification.html_safe
  end
  def status(book)
    book.status ? 'Leu' : 'Nao lido'
  end
end
