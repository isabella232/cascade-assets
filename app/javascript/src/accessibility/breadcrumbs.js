import each from 'foreach';

export const breadcrumbsAccessibility = () => {
  document.addEventListener("DOMContentLoaded",function() {
    const $parentDropdown = $('.breadcrumb-dropdown__container').parents('.breadcrumb-dropdown__parent'),
    $childDropdown = document.querySelectorAll('.breadcrumb-dropdown__child')
    

    each($parentDropdown, (element) => {
      element.addEventListener('mouseenter', function(e) {
        this.querySelector('.breadcrumb-dropdown__child').setAttribute('aria-expanded', 'true')
      });

      element.addEventListener('mouseleave', function(e) {
        this.querySelector('.breadcrumb-dropdown__child').setAttribute('aria-expanded', 'false')
      });

      element.addEventListener('focusout', function(e) {
        const $relatedTarget = $(e.relatedTarget),
        isParentActive = $relatedTarget.parents('.breadcrumb-dropdown__parent.active').length;
        
        if (!isParentActive) {
          this.querySelector('.breadcrumb-dropdown__child').setAttribute('aria-expanded', 'false')
          $(this).removeClass('active');
        }
      });
      
      element.querySelector('.breadcrumb-dropdown__indicator').addEventListener('keypress', function(e) {
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode == 13) {
          var $dropdownParent = this.parentElement.parentElement;
          e.preventDefault();

          if ($dropdownParent.classList.contains('active')) {
            $dropdownParent.classList.remove('active');
            $dropdownParent.querySelector('.breadcrumb-dropdown__child').setAttribute('aria-expanded', 'false');
            return;
          }

          $dropdownParent.classList.add('active');
          $dropdownParent.querySelector('.breadcrumb-dropdown__child').setAttribute('aria-expanded', 'true');
          return;
        }
      })
    });
  });
}
