import { Ref } from "vue";

export const setNumberOfButtons = (numberOfButtons:Ref<number>)=>{
    const media340: MediaQueryList = window.matchMedia('(max-width: 340px)');
    const media500: MediaQueryList = window.matchMedia('(min-width: 341px) and (max-width: 500px)');
    const media600: MediaQueryList = window.matchMedia('(min-width: 501px) and (max-width: 600px)');
    const media824: MediaQueryList = window.matchMedia('(min-width: 601px) and (max-width: 824px)');
    const mediaQueryLarge: MediaQueryList = window.matchMedia('(min-width: 825px)');

    function handleMediaQuery(event: MediaQueryListEvent | MediaQueryList): void {
        // const event = 'matches' in event ? event : event.currentTarget as MediaQueryList;
      
        if (event.media === '(max-width: 340px)') {
          if (event.matches) {
            numberOfButtons.value = 3
          }
        } else if (event.media === '(min-width: 341px) and (max-width: 500px)') {
          if (event.matches) {
            numberOfButtons.value = 4
          }
        } else if (event.media === '(min-width: 501px) and (max-width: 600px)') {
          if (event.matches) {
            numberOfButtons.value = 6
          }
        } else if (event.media === '(min-width: 601px) and (max-width: 824px)') {
          if (event.matches) {
            numberOfButtons.value = 8
          }
        } else if (event.media === '(min-width: 825px)') {
          if (event.matches) {
            numberOfButtons.value = 10;
          }
        }
    }
      
    media340.addEventListener('change', handleMediaQuery);
    media500.addEventListener('change', handleMediaQuery);
    media600.addEventListener('change', handleMediaQuery);
    media824.addEventListener('change', handleMediaQuery);
    mediaQueryLarge.addEventListener('change', handleMediaQuery);

    // Initial check
    handleMediaQuery(media340);
    handleMediaQuery(media500);
    handleMediaQuery(media600);
    handleMediaQuery(media824);
    handleMediaQuery(mediaQueryLarge);

}