export const customTouchStartEventsTable = {
    MobileHeaderOpenSideNavigation: (e) => {
        e.target.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));
    }
}