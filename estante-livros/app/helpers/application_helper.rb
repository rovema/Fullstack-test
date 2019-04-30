module ApplicationHelper
    def flash_message
      notification = ''
      [:success, :info, :warning, :error].each do |type|
        if flash[type]
          notification += "<script>
              swal({
                title: '#{flash[type]}',
                icon: '#{type}',
              });
          </script>"
        end
      end
      notification.html_safe
    end
  
  end
  