$.extend({
	cookiedialog: function (options) {

		var magic_button = $('#magicButton');

		if (typeof (options) == 'undefined') { options = {}; }

		// Main configuration
		var config = {
			popup_title: '',
			popup_text: '',
			allow_all_button_text: '',
			allow_none_button_text: '',
			cookies_page_button_text: '',
			cookie_settings_url: '',
			background_color: '',
			text_color: '',
			buttons_color: '',
			css_filepath: '/Css/cookie-dialog.css',
			default_level: 'essential',
			cookie_expires: new Date((new Date()).getTime() + 365 * 24 * 60 * 60 * 1000), // 365 days
			levels: [
				{
					id: 'essential',
					title: 'Essential'
				},
				{
					id: 'marketing',
					title: 'Marketing'
				},
				{
					id: 'statistics',
					title: 'Statistics'
				}
			]
		};
		$.extend(true, config, options);

		// Add CSS between <head></head>
		$('head').append('<link rel="stylesheet" href="' + config.css_filepath + '" type="text/css" />');

		// Helper functions for reading, adding or removing cookies
		var cookies = {
			set: function (name, value) {
				document.cookie = name + "=" + escape(value) + "; expires=" + config.cookie_expires.toGMTString() + "; path=/;";
			},
			get: function (name) {
				var dc = document.cookie;
				var prefix = name + "=";
				var begin = dc.indexOf("; " + prefix);
				if (begin == -1) {
					begin = dc.indexOf(prefix);
					if (begin != 0) return "";
				} else
					begin += 2;
				var end = document.cookie.indexOf(";", begin);
				if (end == -1)
					end = dc.length;
				return unescape(dc.substring(begin + prefix.length, end));
			},
			clear: function (name) {
				document.cookie = name + '= ; Path=/; expires = Thu, 01 Jan 1970 00:00:00 GMT;';
			}
		};

		var popup = $();

		// Pop-up construction
		function showPopup() {

			var allow_all = $();
			var allow_none = $();
			var configure = $();
			
			popup = $(
				'<div class="cookie-dialog" style="background-color: ' + (config.background_color ==='#' ? '#ffffff' : config.background_color) + ';">' +
				'	<div class="container dialog-content">' +
				'		<div style="color: ' + config.text_color + '; font-size: 24px; font-weight: 900;">'
				+
				config.popup_title
				+
				'		</div>' +
				'		<div class="mt-15 dialog-description" style="color: ' + config.text_color + ';">'
				+
				config.popup_text
				+
				'		</div>' +
				'		<div class="cookiedialog-button-wrap mt-15">' +
				'		</div>' +
				'	</div>' +
				'</div>'
			);

			// Generate buttons
			allow_all = make_button(config.allow_all_button_text, false);
			allow_none = make_button(config.allow_none_button_text, false);

			if (!isEmptyOrSpaces(config.cookie_settings_url) &&
				!isEmptyOrSpaces(config.cookies_page_button_text)) {

				configure = make_button(config.cookies_page_button_text, true);

			}

			// Assign button actions
			allow_all.on('click', function () {
				cookies.set('cookiedialog', 'true');
				setAllCookies();
				closePopup();
			});

			allow_none.on('click', function () {
				if (magic_button.length) {
					cookies.set('cookiedialog', 'true');
					if (cookies.get('cookie_level_marketing')) {
						cookies.clear('cookie_level_marketing', 'marketing');
					}
					if (cookies.get('cookie_level_statistics')) {
						cookies.clear('cookie_level_statistics', 'statistics');
					}
					closePopup();
					location.reload();
				} else {
					cookies.set('cookiedialog', 'true');
					closePopup();
				}
			});

			configure.on('click', function () {
				cookies.set('cookiedialog', 'true');
				closePopup();
				window.location.href = config.cookie_settings_url;
			});

			// Append buttons in dialog
			popup.find('.cookiedialog-button-wrap').append(allow_all).append(allow_none).append(configure);

			// Make pop-up visible
			$('body').append(popup);

		}

		function closePopup() {
			$('body').remove('.cookie-dialog');
			popup.fadeOut('normal');
		}

		function make_button(text, alt) {
			var button = $();
			if (alt) {
				button = $(
					'<button class="btn btn-white" style="color: ' + config.background_color + '; background-color: #' + config.buttons_color + ';">'
					+
					text
					+
					'</button>'
				);
			} else {
				button = $(
					'<button class="btn btn-outline-primary" style="color: #' + config.buttons_color + '; border-color: #' + config.buttons_color + ';">'
					+
					text
					+
					'</button>'
				);
			}
			return button;
		}

		function setAllCookies() {
			for (var i = 0, level; level = config.levels[i]; i++) {
				if (!cookies.get('cookie_level_' + level.id) && config.default_level != level.id) {
					cookies.set('cookie_level_' + level.id, level.id);
				}
			}
			location.reload();
		}

		function setMarketingCookies() {
			if (!cookies.get('cookie_level_marketing')) {
				cookies.set('cookie_level_marketing', 'marketing');
			}
			location.reload();
		}

		function setStatisticsCookies() {
			if (!cookies.get('cookie_level_statistics')) {
				cookies.set('cookie_level_statistics', 'statistics');
			}
			location.reload();
		}

		function clearMarketingCookies() {
			if (cookies.get('cookie_level_marketing')) {
				cookies.clear('cookie_level_marketing', 'marketing');
			}
			location.reload();
		}

		function clearStatisticsCookies() {
			if (cookies.get('cookie_level_statistics')) {
				cookies.clear('cookie_level_statistics', 'statistics');
			}
			location.reload();
		}

		function isEmptyOrSpaces(str) {
			return str === null || str.match(/^ *$/) !== null;
		}

		if (!cookies.get('cookiedialog')) {
			showPopup();
		}

		if (magic_button) {
			magic_button.on('click', function () {
				cookies.clear('cookiedialog');
				cookies.clear('cookie_level_statistics', 'statistics');
				cookies.clear('cookie_level_marketing', 'marketing');
				location.reload();
			});
		}

		var acceptStatistics = $('#acceptStatistics');
		var rejectStatistics = $('#rejectStatistics');
		var acceptMarketing = $('#acceptMarketing');
		var rejectMarketing = $('#rejectMarketing');

		if (acceptStatistics) {
			if (cookies.get('cookie_level_statistics')) {
				acceptStatistics.prop('checked', true);
			}
			acceptStatistics.on('click', function () {
				setStatisticsCookies();
				if (!cookies.get('cookiedialog')) {
					cookies.set('cookiedialog', 'true');
				}
			});
		}

		if (rejectStatistics) {
			if (!cookies.get('cookie_level_statistics')) {
				rejectStatistics.prop('checked', true);
			}
			rejectStatistics.on('click', function () {
				clearStatisticsCookies();
				if (!cookies.get('cookiedialog')) {
					cookies.set('cookiedialog', 'true');
				}
			});
		}

		if (acceptMarketing) {
			if (cookies.get('cookie_level_marketing')) {
				acceptMarketing.prop('checked', true);
			}
			acceptMarketing.on('click', function () {
				setMarketingCookies();
				if (!cookies.get('cookiedialog')) {
					cookies.set('cookiedialog', 'true');
				}
			});
		}

		if (rejectMarketing) {
			if (!cookies.get('cookie_level_marketing')) {
				rejectMarketing.prop('checked', true);
			}
			rejectMarketing.on('click', function () {
				clearMarketingCookies();
				if (!cookies.get('cookiedialog')) {
					cookies.set('cookiedialog', 'true');
				}
			});
		}

		//if ($(window).width() < 1440) {
		//	$('.responsive-table-input-matrix th').css('width', 'unset');
		//	$('.responsive-table-input-matrix td').css('width', 'unset');
		//	$('.responsive-table-input-matrix').css('width', 'unset');
		//}

	}
});
