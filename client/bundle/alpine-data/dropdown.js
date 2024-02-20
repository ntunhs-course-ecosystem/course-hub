export const getDropdownData = function () {
    return {
        open: false,
        toggle() {
            if (this.open) {
                return this.close();
            }

            this.$refs.button.focus();

            this.open = true;
        },
        close(focusAfter) {
            if (!this.open) return;

            this.open = false;

            focusAfter && focusAfter.focus();
        }
    };
};