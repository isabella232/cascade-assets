import each from 'foreach';

export const breadcrumbsAccessibility = () => {
  document.addEventListener("DOMContentLoaded",function() {
    const parentDropdown = $('.breadcrumb-dropdown__container').parents('.breadcrumb-dropdown__parent');

    each(parentDropdown, (element) => {
      element.addEventListener('mouseenter', function(e) {
        this.querySelector('.breadcrumb-dropdown__child').setAttribute('aria-expanded', 'true')
      });

      element.addEventListener('mouseleave', function(e) {
        this.querySelector('.breadcrumb-dropdown__child').setAttribute('aria-expanded', 'false')
      });

      element.addEventListener('focusin', function(e) {
        this.querySelector('.breadcrumb-dropdown__child').setAttribute('aria-expanded', 'true')
      });

      element.addEventListener('focusout', function(e) {
        this.querySelector('.breadcrumb-dropdown__child').setAttribute('aria-expanded', 'false')
      })
    });
    //here code
  });
}
