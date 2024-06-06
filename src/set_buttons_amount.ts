import { Ref } from "vue";

export const setNumberOfButtons = (numberOfButtons:Ref<number>)=>{
    const mediaQuerySmall: MediaQueryList = window.matchMedia('(max-width: 600px)');
    const mediaQueryMedium: MediaQueryList = window.matchMedia('(min-width: 601px) and (max-width: 1024px)');
    const mediaQueryLarge: MediaQueryList = window.matchMedia('(min-width: 1025px)');

    function handleMediaQuery(event: MediaQueryListEvent | MediaQueryList): void {
        // const event = 'matches' in event ? event : event.currentTarget as MediaQueryList;
      
        if (event.media === '(max-width: 600px)') {
          if (event.matches) {
            numberOfButtons.value = 4
          }
        } else if (event.media === '(min-width: 601px) and (max-width: 1024px)') {
          if (event.matches) {
            numberOfButtons.value = 8
          }
        } else if (event.media === '(min-width: 1025px)') {
          if (event.matches) {
            numberOfButtons.value = 10;
          }
        }
    }
      
    mediaQuerySmall.addEventListener('change', handleMediaQuery);
    mediaQueryMedium.addEventListener('change', handleMediaQuery);
    mediaQueryLarge.addEventListener('change', handleMediaQuery);

    // Initial check
    handleMediaQuery(mediaQuerySmall);
    handleMediaQuery(mediaQueryMedium);
    handleMediaQuery(mediaQueryLarge);

}