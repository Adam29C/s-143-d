(function($) {
    "use strict"

    $(document).ready(function() {
        const versionSelect = $('#theme_version');
        const layoutSelect = $('#theme_layout');
        const sidebarStyleSelect = $('#sidebar_style');
        const sidebarPositionSelect = $('#sidebar_position');
        const headerPositionSelect = $('#header_position');
        const containerLayoutSelect = $('#container_layout');
        const themeDirectionSelect = $('#theme_direction');

        function applySettings() {
         //   $('body').attr('data-theme-version', versionSelect.val());
            $('body').attr('data-sidebar-position', 'fixed'); // Or sidebarPositionSelect.val()
            $('body').attr('data-header-position', 'fixed'); // Or headerPositionSelect.val()
            $('html').attr('dir', themeDirectionSelect.val());
            $('html').attr('class', '');
            $('html').addClass(themeDirectionSelect.val());
            $('body').attr('direction', themeDirectionSelect.val());

            if($('body').attr('data-sidebar-style') === 'overlay') {
                $('body').attr('data-sidebar-style', 'full');
                $('body').attr('data-layout', layoutSelect.val());
            } else {
                $('body').attr('data-layout', layoutSelect.val());
            }

            if(containerLayoutSelect.val() === "boxed") {
                if($('body').attr('data-layout') === "vertical" && $('body').attr('data-sidebar-style') === "full") {
                    $('body').attr('data-sidebar-style', 'overlay');
                    $('body').attr('data-container', containerLayoutSelect.val());
                } else {
                    $('body').attr('data-container', containerLayoutSelect.val());
                }
            } else {
                $('body').attr('data-container', containerLayoutSelect.val());
            }

            if($('body').attr('data-layout') === "horizontal") {
                if(sidebarStyleSelect.val() === "overlay") {
                    alert("Sorry! Overlay is not possible in Horizontal layout.");
                } else {
                    $('body').attr('data-sidebar-style', sidebarStyleSelect.val());
                }
            } else if($('body').attr('data-layout') === "vertical") {
                if($('body').attr('data-container') === "boxed" && sidebarStyleSelect.val() === "full") {
                    alert("Sorry! Full menu is not available in Vertical Boxed layout.");
                } else {
                    $('body').attr('data-sidebar-style', sidebarStyleSelect.val());
                }
            } else {
                $('body').attr('data-sidebar-style', sidebarStyleSelect.val());
            }
        }

        applySettings(); // Apply settings on page load

        versionSelect.on('change', applySettings);
        layoutSelect.on('change', applySettings);
        sidebarStyleSelect.on('change', applySettings);
        sidebarPositionSelect.on('change', applySettings);
        headerPositionSelect.on('change', applySettings);
        containerLayoutSelect.on('change', applySettings);
        themeDirectionSelect.on('change', applySettings);

        $('input[name="navigation_header"]').on('click', function() {
            $('body').attr('data-nav-headerbg', this.value);
        });

        $('input[name="header_bg"]').on('click', function() {
            $('body').attr('data-headerbg', this.value);
        });

        $('input[name="sidebar_bg"]').on('click', function() {
            $('body').attr('data-sibebarbg', this.value);
        });
    });
})(jQuery);
