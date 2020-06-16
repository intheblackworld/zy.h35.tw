var regexer = {
	txt1: /^.{1,}/,
	txt2: /^.{2,}/,
	txt3: /^.{3,}/,
	txt8: /^.{8,}/,
	txt10: /^.{10,}/,
	txt300: /^.{300,}/,
	img: /^.{1,}\.(gif|jpg|jpeg|bmp|png)$/,
	num: /^[1-9]{1}[\d]{0,}/,
	url: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
	email: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
	phone: /[0-9|\-|\(|\)]{7,}/
};

var mobiles = new Array(
	'midp',
	'j2me',
	'avant',
	'docomo',
	'novarra',
	'palmos',
	'palmsource',
	'240x320',
	'opwv',
	'chtml',
	'pda',
	'windows ce',
	'mmp/',
	'blackberry',
	'mib/',
	'symbian',
	'wireless',
	'nokia',
	'hand',
	'mobi',
	'phone',
	'cdm',
	'up.b',
	'audio',
	'sie-',
	'sec-',
	'samsung',
	'htc',
	'mot-',
	'mitsu',
	'sagem',
	'sony',
	'alcatel',
	'lg',
	'eric',
	'vx',
	'NEC',
	'philips',
	'mmm',
	'xx',
	'panasonic',
	'sharp',
	'wap',
	'sch',
	'rover',
	'pocket',
	'benq',
	'java',
	'pt',
	'pg',
	'vox',
	'amoi',
	'bird',
	'compal',
	'kg',
	'voda',
	'sany',
	'kdd',
	'dbt',
	'sendo',
	'sgh',
	'gradi',
	'jb',
	'dddi',
	'moto',
	'iphone',
	'android',
	'iPod',
	'incognito',
	'webmate',
	'dream',
	'cupcake',
	'webos',
	's8000',
	'bada',
	'googlebot-mobile'
);
var ua = navigator.userAgent.toLowerCase();

var isMobile = false;

for (var i = 0; i < mobiles.length; i++) {
	if (ua.indexOf(mobiles[i]) > 0) {
		isMobile = true;
		break;
	}
}

var secObj = {};
if (isMobile) {
	secObj.kv1 = {
		page: 1,
		name: 'kv'
	};
	secObj.kv2 = {
		page: 1,
		name: 'kv2'
	};
	secObj.p1 = {
		page: 2,
		name: 'youtube-video'
	};
	secObj.p2 = {
		page: 3,
		name: 'livable'
	};
	secObj.p3 = {
		page: 4,
		name: 'speed'
	};
	secObj.p4 = {
		page: 5,
		name: 'monster'
	};
	// secObj.p5 = {
	// 	page: 6,
	// 	name: 'cubespace'
	// };
	secObj.p5 = {
		page: 6,
		name: 'greensea'
	};
	secObj.p6 = {
		page: 7,
		name: 'team'
	};

	secObj.p7 = {
		page: 8,
		name: 'intro'
	};

	secObj.p8 = {
		page: 9,
		name: 'contact'
	};
} else {
	secObj.kv1 = {
		page: 1,
		name: 'kv'
	};
	secObj.kv2 = {
		page: 1,
		name: 'kv2'
	};
	secObj.p1 = {
		page: 2,
		name: 'youtube-video'
	};
	secObj.p2 = {
		page: 3,
		name: 'livable'
	};
	secObj.p3 = {
		page: 4,
		name: 'speed'
	};
	secObj.p4 = {
		page: 5,
		name: 'monster'
	};
	// secObj.p5 = {
	// 	page: 6,
	// 	name: 'cubespace'
	// };
	secObj.p5 = {
		page: 6,
		name: 'greensea'
	};
	secObj.p6 = {
		page: 7,
		name: 'team'
	};

	secObj.p7 = {
		page: 8,
		name: 'intro'
	};

	secObj.p8 = {
		page: 9,
		name: 'template'
	};

	secObj.p9 = {
		page: 10,
		name: 'contact'
	};
}

var secArr = [];

var windowHeight = 100;
var windowWidth;

var vm = new Vue({
	el: '#app',
	data: function() {
		return {
			status: {
				kv: true,
				cover: true, // # 記得開啟
				intro: false,
				monster: false,
				reservation: false,
				usableSubmit: false,
				messagesModal: false,
				formSent: false,
				footer: false,
				sidemenu: false,
				newsModal: false,
				agreementModal: false,
				cubeModal: false,
				msgModal: false,
				livableModal: false,
				teamModal: false,
				leafletsModal: false,
				pageScroll: true
			},

			menu: [
				{
					title: '超宜居星球',
					anchor: 'p2',
					icon: 'img/icon-livable.png'
				},
				{
					title: '超光速傳輸',
					anchor: 'p3',
					icon: 'img/icon-speed.png'
				},
				{
					title: '怪獸級綠海',
					anchor: 'p4',
					icon: 'img/icon-master.png'
				},
				{
					title: '超魔方空間',
					anchor: 'cube',
					icon: 'img/icon-cube.png'
				},
				{
					title: '超硬派天團',
					anchor: 'p6',
					icon: 'img/icon-team.png'
				}
			],

			beef: {},

			videos: {
				active: 0,
				items: [{ videoId: 'QYa1IPINq-c' }]
			},

			leaflets: {
				use: {},
				items: [
					{
						id: 1,
						name: '正義聯盟-怪獸級綠海X零負評環境',
						img: 'justic-environment.jpg',
						thumb: 'justic-environment-small.jpg'
					},
					{
						id: 2,
						name: '正義聯盟-正義降臨X英雄再起',
						img: 'justic-reservation.jpg',
						thumb: 'justic-reservation-small.jpg'
					},
					{
						id: 3,
						name: '正義聯盟-宇宙無敵規格X絕對正義價格 ',
						img: 'justic-specification.jpg',
						thumb: 'justic-specification-small.jpg'
					}
				]
			},

			compass: {
				use: {
					name: '宜居星球',
					title: 'img/kv2/livable.png?v1',
					content: '52公頃北台最大自辦重劃區<br/>緊鄰424公頃大台北都會公園<br/>環境空間鈔票通通變大',
					icon: 'img/kv2/livable-icon.png?v1'
				},
				swiper: [
					{
						name: '宜居星球',
						title: 'img/kv2/livable.png?v1',
						content: '52公頃北台最大自辦重劃區<br/>緊鄰424公頃大台北都會公園<br/>環境空間鈔票通通變大',
						icon: 'img/kv2/livable-icon.png?v1'
					},
					{
						name: '光速傳輸',
						title: 'img/kv2/speed.png?v1',
						content:
							'300秒新莊副都心，600秒台北國門<br/>3高 :  中山高、五楊高、汐五高<br/>4快 :  台1、台64、台65、新北環快<br/>4捷 :  環狀線、蘆洲線、機場線、五股泰山線<br/>多波段漲幅高潮不斷',
						icon: 'img/kv2/speed-icon.png?v1'
					},
					{
						name: '魔方空間',
						title: 'img/kv2/cube.png?v1',
						content: '異次元神奇魔方空間<br/>18坪2房 秘密基地<br/>26坪3房 星際戰艦',
						icon: 'img/kv2/cube-icon.png?v1'
					},
					{
						name: '怪獸綠海',
						title: 'img/kv2/monster.png?v1',
						content: ' 424公頃水岸大台北都會公園<br/>侏儸紀公園綠海約16座大安森林<br/>磁吸當代暴龍迅猛龍',
						icon: 'img/kv2/monster-icon.png?v1'
					},
					{
						name: '硬派天團',
						title: 'img/kv2/team.png?v1',
						content: '強強聯手重磅出擊<br/>哈佛名門億萬豪宅御用呂建勳<br/>兩岸盛名珩荷設計總監徐慈姿',
						icon: 'img/kv2/team-icon.png?v1'
					},
					{
						name: '逆天規格',
						title: 'img/kv2/standard.png?v1',
						content: '台北十大豪宅規格<br/>七星級飯店公設<br/>國際級水岸公園生活',
						icon: 'img/kv2/standard-icon.png?v1'
					},
					{
						name: '戰鬥機能',
						title: 'img/kv2/superiority.png?v1',
						content: '工商路戰鬥級全方位商圈<br/>全聯 屈臣氏 寶雅 麥當勞 銀行<br/>零售藥妝百貨超商一舉到位',
						icon: 'img/kv2/superiority-icon.png?v1'
					}
				]
			},

			team: {
				use: {
					id: 1,
					img: 'img/work/1/1/1.jpg',
					title: 'default',
					name: '徐慈姿',
					style: 'background-image: linear-gradient(to top, #701418, #a61e23);'
				},
				female: {
					active: 1,
					name: '徐慈姿',
					style: ' background-image: linear-gradient(to top, #0f1160, #244696);',
					works: [
						{
							id: 1,
							img: 'img/work/1/1/1.jpg',
							title: '大隱頤海大院'
						},
						{
							id: 2,
							img: 'img/work/1/1/2.jpg',
							title: '大隱頤海大院'
						},
						{
							id: 3,
							img: 'img/work/1/1/3.jpg',
							title: '大隱頤海大院'
						},
						{
							id: 4,
							img: 'img/work/1/2/1.jpg',
							title: '大隱藍海'
						},
						{
							id: 5,
							img: 'img/work/1/2/2.jpg',
							title: '大隱藍海'
						},
						{
							id: 6,
							img: 'img/work/1/2/3.jpg',
							title: '大隱藍海'
						},
						{
							id: 7,
							img: 'img/work/1/3/1.jpg',
							title: '興富發新富邑'
						},
						{
							id: 8,
							img: 'img/work/1/3/2.jpg',
							title: '興富發新富邑'
						},
						{
							id: 9,
							img: 'img/work/1/3/3.jpg',
							title: '興富發新富邑'
						},
						{
							id: 10,
							img: 'img/work/1/4/1.jpg',
							title: '寶鋪縱橫天廈'
						},
						{
							id: 11,
							img: 'img/work/1/4/2.jpg',
							title: '寶鋪縱橫天廈'
						},
						{
							id: 12,
							img: 'img/work/1/4/3.jpg',
							title: '寶鋪縱橫天廈'
						},
						{
							id: 13,
							img: 'img/work/1/4/4.jpg',
							title: '寶鋪縱橫天廈'
						}
					]
				},
				male: {
					active: 1,
					name: '呂建勳',
					style: 'background-image: linear-gradient(to top, #701418, #a61e23);',
					works: [
						{
							id: 1,
							img: 'img/work/2/p1.jpg',
							title: '國美A1'
						},
						{
							id: 2,
							img: 'img/work/2/p2.jpg',
							title: '都峰苑'
						},
						{
							id: 3,
							img: 'img/work/2/p3.jpg',
							title: '敦南樞苑'
						},
						{
							id: 4,
							img: 'img/work/2/p4.jpg',
							title: '翔譽之心'
						},
						{
							id: 5,
							img: 'img/work/2/p5.jpg',
							title: '德杰flora'
						}
					]
				}
			},

			page: {
				nowPage: 0,
				dir: 'down'
			},

			pageStyleObject: {
				transform: ''
			},

			form: {
				name: '',
				job: '',
				email: '',
				phone: '',
				city_id: null,
				district_id: null,
				message: '',
				status: 1,
				booking: 0,
				note: '',
				agree: true
			},

			area: {},

			cube: {
				use: {
					title: 'aaaaaa',
					pic: 'img/cube/p1.jpg'
				},
				swiper: [
					{
						title: 'aaaaaa',
						pic: 'img/cube/p1.jpg'
					},
					{
						title: 'bbbbbb',
						pic: 'img/cube/p2.jpg'
					},
					{
						title: 'cccccc',
						pic: 'img/cube/p3.jpg'
					},
					{
						title: 'dddddd',
						pic: 'img/cube/p4.jpg'
					},
					{
						title: 'aaaaaa',
						pic: 'img/cube/p1.jpg'
					},
					{
						title: 'bbbbbb',
						pic: 'img/cube/p2.jpg'
					},
					{
						title: 'cccccc',
						pic: 'img/cube/p3.jpg'
					},
					{
						title: 'dddddd',
						pic: 'img/cube/p4.jpg'
					}
				]
			},

			slideshow: {
				livable: {
					active: 0,
					num: 4,
					sec: 3000,
					time: null
				},
				monster: {
					active: 0,
					sec: 3000,
					time: null,
					items: [
						{
							name: '棒球場',
							pic: 'slide1.jpg'
						},
						{
							name: '寵物公園',
							pic: 'slide2.jpg'
						},
						{
							name: '寵物公園',
							pic: 'slide3.jpg'
						},
						{
							name: '大台北都會公園',
							pic: 'slide4.jpg'
						},
						{
							name: '洲子洋公園',
							pic: 'slide5.jpg'
						},
						{
							name: '關渡夕照',
							pic: 'slide6.jpg'
						}
					]
				},
				greensea: {
					active: 0,
					sec: 3000,
					time: null,
					items: [
						{
							name: '火鍋美饌',
							pic: 'slide1.jpg'
						},
						{
							name: '全聯購物',
							pic: 'slide2.jpg'
						},
						{
							name: '家樂福超市',
							pic: 'slide3.jpg'
						},
						{
							name: '傳統市場',
							pic: 'slide4.jpg'
						},
						{
							name: '寵物餐廳',
							pic: 'slide5.jpg'
						},
						{
							name: '寶雅百貨',
							pic: 'slide6.jpg'
						}
					]
				},
				cube: {
					active: 0,
					num: 4
				}
			},

			validation: {
				email: false,
				name: false,
				phone: false
			},

			validationRules: {
				email: regexer.email,
				name: regexer.txt2,
				phone: regexer.phone
			},

			hasError: {
				email: false,
				name: false,
				phone: false
			}
		};
	},

	computed: {
		modalStatus: function() {
			var boolean = true;

			if (
				this.status.reservation ||
				this.status.messagesModal ||
				this.status.cubeModal ||
				this.status.livableModal ||
				this.status.leafletsModal ||
				this.status.newsModal ||
				this.status.msgModal
			) {
				boolean = false;
			}

			return boolean;
		}
	},

	beforeMount: function() {
		var that = this;

		$.get('js/zip.json', function(res) {
			res = typeof res === 'object' ? res : JSON.parse(res);
			that.area = res;

			that.form.city_id = Object.keys(that.area)[0];
			that.form.district_id = Object.keys(that.area[that.form.city_id].district)[0];
		});
	},

	methods: {
		switchStatus: function(which, boolean) {
			this.status[which] = boolean;

			if (which === 'livableModal' && boolean == false) {
				$('.planet-sec .section_content').css('width', '100%');
				$('.planet-sec .section_content .section_info').css('width', '100%');
			}
		},

		switchSidemenuStatus: function() {
			this.status.sidemenu = !this.status.sidemenu;
		},

		closeModalMessages: function(stage) {
			if (stage == 'done') {
				this.status.reservation = false;
			}

			if (stage == 'again') {
				this.status.reservation = true;
			}
			this.status.messagesModal = false;
		},

		setPageTransform: function(which) {
			var that = this;
			var unit = $('html').hasClass('ie') ? 'vh' : 'px';
			this.status.intro = false;

			if (which !== 'cube') {
				this.status.sidemenu = false;
				secArr.forEach(function(el, index) {
					if (el.type == which) {
						that.status.cover = false;
						that.page.nowPage = index;
						// that.pageStyleObject.transform = 'translateY(-' + windowHeight * (el.page - 1) + unit + ')';
						$("html,body").animate({'scrollTop':windowHeight * (el.page - 1) + unit});
					}
				});
			} else {
				this.status.msgModal = true;
			}
		},

		// kv slideshow
		setLoopSlide: function(which) {
			var that = this;

			clearInterval(that.slideshow[which].time);

			that.slideshow[which].time = setInterval(function() {
				console.log(1)
				that.slideshow[which].active++;
				if (that.slideshow[which].active > that.slideshow[which].items.length - 1) {
					that.slideshow[which].active = 0;
				}
			}, that.slideshow[which].sec);
		},

		send: function() {
			var that = this;

			$.ajax({
				url: 'api.php',
				method: 'POST',
				dataType: 'json',
				data: {
					justice: that.form
				},

				error: function(xhr, ajaxOptions, thrownError) {
					that.status.reservation = false;
					that.status.formSent = false;
					that.status.messagesModal = true;
					console.log(xhr.responseText);
				},

				success: function(res) {
					if (+res) {
						that.form = {
							name: '',
							job: '',
							email: '',
							phone: '',
							city_id: null,
							district_id: null,
							message: '',
							status: 1,
							booking: 0,
							note: '',
							agree: true
						};

						that.status.formSent = true;
						that.status.reservation = false;
						that.status.messagesModal = true;
						that.form.city_id = Object.keys(that.area)[0];
						that.form.district_id = Object.keys(that.area[that.form.city_id].district)[0];
					}
				}
			});
		},

		validator: function() {
			var that = this;
			var verified = false;

			$.each(that.validation, function(index, value) {
				var checked = that.form[index] && that.validationRules[index].test(that.form[index]);

				that.validation[index] = checked;
				that.hasError[index] = !checked;
			});

			$.each(that.validation, function(index, value) {
				verified = true;

				if (!value) {
					verified = false;
					return false;
				}
			});

			if (!that.form.agree) {
				verified = false;
			}

			that.status.usableSubmit = verified;
		},

		updateDistrict: function(cid) {
			this.form.district_id = Object.keys(this.area[cid].district)[0];
		},

		triggerTeamModal: function(which) {
			this.status.teamModal = true;
			var key = parseInt(this.team[which].active) - 1;

			this.team.use = objectDeepCopy(this.team[which].works[key]);
			this.team.use.style = this.team[which].style;
			this.team.use.name = this.team[which].name;
			this.team.use.which = which;
		},

		triggerLeafletsModal: function(index) {
			this.status.leafletsModal = true;
			this.leaflets.use = this.leaflets.items[index];
		},

		nextTeamModal: function() {
			var which = this.team.use.which;
			var json = this.team[which].works;

			this.team[which].active = this.team[which].active + 1;
			if (this.team[which].active > json.length) {
				this.team[which].active = 1;
			}

			this.triggerTeamModal(which);
		},

		prevTeamModal: function() {
			var which = this.team.use.which;
			var json = this.team[which].works;

			this.team[which].active = this.team[which].active - 1;
			if (this.team[which].active <= 0) {
				this.team[which].active = json.length;
			}

			this.triggerTeamModal(which);
		},

		setVideoActive: function(key) {
			if (this.videos.active > key) {
				$('.youtube-video .slide_prev').trigger('click');
			} else {
				$('.youtube-video .slide_next').trigger('click');
			}

			this.videos.active = key;
		}
	},

	created: function() {
		// 處理 secObj 為陣列
		getSectionPos();
		// this.setPageTransform('p4');
	},

	watch: {
		'page.nowPage': function(val) {
			setPageAnimatClass(val);

			// if (val === 0 || val === 1 || val === 6 || val === 7) {
			// 	this.status.footer = true;
			// } else {
			// 	this.status.footer = false;
			// }

			if (val === 1) {
				compass();
			}

			// if (val === 4) {
			// 	this.setLoopSlide('monster');
			// }
			// if (val === 5) {
			// 	this.setLoopSlide('greensea');
			// }
		},
		'form.agree': function(val) {
			if (!val) {
				this.status.usableSubmit = false;
			} else {
				this.validator();
			}
		},
		'status.intro': function(val) {
			if (!val) {
				this.status.pageScroll = true;
			}
		},
		'status.livableModal': function(val) {
			viewportDetect('#modal_livable .modal_container');
		},
		'status.leafletsModal': function(val) {
			viewportDetect('#modal_leaflets .modal_container');
		}
	},
	mounted: function() {
		$('body').addClass('loaded');

		// autoplay loop slide
		this.setLoopSlide('livable');
		this.setLoopSlide('monster');
		this.setLoopSlide('greensea');
	}
});

function preventIphoneScale() {
	document.addEventListener(
		'touchstart',
		function(event) {
			if (event.touches.length > 1) {
				event.preventDefault();
			}
		},
		{ passive: false }
	);
	var lastTouchEnd = 0;
	document.addEventListener(
		'touchend',
		function(event) {
			var now = new Date().getTime();
			if (now - lastTouchEnd <= 300) {
				event.preventDefault();
			}
			lastTouchEnd = now;
		},
		{ passive: false }
	);
	document.addEventListener(
		'gesturestart',
		function(event) {
			event.preventDefault();
		},
		{ passive: false }
	);
}

// ------ 頁面滾動邏輯 -------- //
// 偵測鍵盤上下的方向
function setJsKeyup() {
	$(document).on('keyup', function(e) {
		switch (event.keyCode) {
			case 38:
				goTriggerPage('up');
				break;
			case 40:
				goTriggerPage('down');
				break;
		}
	});
}

// 偵測手機版觸控的方向
function setJsTouch() {
	var ts, te;
	var wHeight = 150;
	$(document).on('touchstart', function(e) {
		ts = e.originalEvent.touches[0].clientY;
	});

	$(document).on('touchend', function(e) {
		te = e.originalEvent.changedTouches[0].clientY;
		if (wHeight < Math.abs(ts - te)) {
			if (ts > te) {
				goTriggerPage('down');
			} else {
				goTriggerPage('up');
			}
		}
	});
}

// 偵測桌機的滾軸, 觸控板的移動方向
function setJsMousewheel() {
	$(document).off('mousewheel DOMMouseScroll');
	$(document).on('mousewheel DOMMouseScroll', function(e) {
		var delta =
			(e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
			(e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox

		var timer;

		$(document).off('mousewheel DOMMouseScroll');
		if (delta > 0) {
			goTriggerPage('up');
		} else if (delta < 0) {
			goTriggerPage('down');
		}

		timer = setTimeout(function() {
			setJsMousewheel();
			clearTimeout(timer);
		}, 1500);
	});
}

// 頁面 鍵盤, 觸控板, 滾輪滑動, 觸發頁面滾動
function goTriggerPage(dir) {
	var nowPage = vm.page.nowPage;
	var unit = $('html').hasClass('ie') ? 'vh' : 'px';

	// modal open , cover open 禁滑動
	if (vm.modalStatus && !vm.status.cover && !vm.status.sidemenu && vm.status.pageScroll && !vm.status.intro) {
		if (dir === 'up') {
			nowPage = nowPage - 1;
			if (nowPage < 1) {
				nowPage = 0;
			}
			// if (nowPage >= secArr.length) {
			// 	$(document).off('mousewheel DOMMouseScroll');
			// }
		}

		if (dir === 'down') {
			nowPage = nowPage + 1;
			if (nowPage >= secArr.length) {
				// $('body').removeClass('stop-scroll');
				// $(document).off('mousewheel DOMMouseScroll');
				nowPage = secArr.length - 1;
			} else {
				// $('body').addClass('stop-scroll');
			}
		}

		vm.page.dir = dir;
		vm.page.nowPage = nowPage;
		//vm.pageStyleObject.transform = 'translateY(-' +  + ')';
		$("html,body").animate({'scrollTop':windowHeight * (secArr[nowPage].page - 1) + unit})
	}
}

// mobile 瀏覽器 關閉觸控 reload
function preventPullToRefresh(element) {
	var prevent = false;

	document.querySelector(element).addEventListener('touchstart', function(e) {
		if (e.touches.length !== 1) {
			return;
		}

		var scrollY = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
		prevent = scrollY === 0;
	});

	document.querySelector(element).addEventListener('touchmove', function(e) {
		if (prevent) {
			prevent = false;
			// e.preventDefault();
		}
	});
}

preventPullToRefresh('html');

// ------ window function -------- //

$(window)
	.on('resize', function() {
		windowWidth = $(window).width();

		if (windowWidth >= 992) {
			vm.status.sidemenu = false;
			vm.status.intro = false;
		}

		// 偵測手機版高度
		mobileFullHeight();
		// 啟用滾軸
		setJsMousewheel();

		vm.setPageTransform(secArr[vm.page.nowPage].type);

		var cubeslideTimer;
		cubeslideTimer = setTimeout(function() {
			$('.cubeslide').css({
				'max-height': $('.cubeslide-active').height(),
				height: 100 + '%'
			});

			$('.youtube-slideshow').css({
				height: $('.video_item').height()
			});

			$('.cubeslide .slide_prev').css('left', 'calc(50% - ' + ($('.cubeslide-active').width() / 2 - 10) + 'px)');
			$('.cubeslide .slide_next').css('right', 'calc(50% - ' + ($('.cubeslide-active').width() / 2 - 10) + 'px)');

			clearTimeout(cubeslideTimer);
		}, 1000);
	})
	.on('load', function() {
		// 偵測手機版高度
		mobileFullHeight();
		// 啟用滾軸與手勢, modal 開的時候
		setJsMousewheel();
		setJsTouch();
		setJsKeyup();
		preventIphoneScale();

		var skipTimer;

		skipTimer = setTimeout(function() {
			vm.status.cover = false;
			$('.cover-kv').addClass('out');
			clearTimeout(skipTimer);
		}, 1000);

		$('.cubeslide').css({
			'max-height': $('.cubeslide-active').height(),
			height: 100 + '%'
		});

		$('.youtube-slideshow').css({
			height: $('.video_item').height()
		});

		$('.cubeslide .slide_prev').css('left', 'calc(50% - ' + ($('.cubeslide-active').width() / 2 - 20) + 'px)');
		$('.cubeslide .slide_next').css('right', 'calc(50% - ' + ($('.cubeslide-active').width() / 2 - 20) + 'px)');
	});

$('.unscroll')
	.on('mouseover', function(el) {
		vm.status.pageScroll = false;
	})
	.on('mouseout', function(el) {
		vm.status.pageScroll = true;
	});

// ------ 偵測手機版高度 -------- //
function mobileFullHeight() {
	var isIE = $('html').hasClass('ie');

	if (!isIE) {
		var vh = window.innerHeight * 0.01;
		windowHeight = vh * 100;
		document.documentElement.style.setProperty('--vh', vh + 'px');
	}
}

// ------ 深複製 obj -------- //
function objectDeepCopy(obj) {
	return typeof obj === 'object' && obj !== null ? JSON.parse(JSON.stringify(obj)) : false;
}

// ------ page stage -------- //
function goKV1Stage() {
	$('.section-kv').addClass('on');
}

// ------ Section Class: null on out -------- //
function setPageAnimatClass(nowPage) {
	var pageName = secArr[nowPage].name;
	var dir = vm.page.dir;
	var section = $('.section');

	var nowPage = vm.page.nowPage;

	secArr.forEach(function(el, i) {
		var pageName = secArr[i].name;

		if (i == nowPage) {
			if (pageName !== 'kv2') {
				$('.section-' + pageName)
					.removeClass('out')
					.addClass('on');
			} else {
				$('.section-kv')
					.removeClass('on')
					.addClass('out');
			}
		}

		if (nowPage > 1) {
			$('.section-kv')
				.removeClass('on')
				.addClass('out');
		}
	});
}

// ------ 處理 secObj 為陣列 -------- //
function getSectionPos() {
	secArr.length = 0;
	for (var key in secObj) {
		secArr.push({
			type: key,
			page: secObj[key].page,
			name: secObj[key].name
		});
	}
}

// compass
var compassArr = [];
var compassTimer;

$('.compass_item').each(function(i, el) {
	compassArr.push($(el));
});

$(document).on('click', '.compass-slide-prev', function(e) {
	compassPrev();
});

$(document).on('click', '.compass-slide-next', function(e) {
	compassNext();
});

function compass() {
	var $items = $('.compass_item');
	$items.removeClass(
		'compass-slide-top compass-slide-prev compass-slide-active compass-slide-next compass-slide-bottom'
	);

	compassArr[compassArr.length - 1].addClass('compass-slide-prev');
	compassArr[0].addClass('compass-slide-active');
	compassArr[1].addClass('compass-slide-next');
	compassArr[2].addClass('compass-slide-bottom');
	compassArr[3].addClass('compass-slide-bottom');
	compassArr[4].addClass('compass-slide-bottom');
	compassArr[compassArr.length - 2].addClass('compass-slide-top');

	var itemIndex = $('.compass-slide-active').attr('data-compass-index');
	vm.compass.use = vm.compass.swiper[itemIndex];

	clearInterval(compassTimer);
	compassTimer = setInterval(function() {
		compassNext();
	}, 3000);
}

function compassPrev() {
	compassArr.unshift(compassArr[compassArr.length - 1]);
	compassArr.pop();
	compass();
}

function compassNext() {
	compassArr.push(compassArr[0]);
	compassArr.shift();
	compass();
}

// cubeslide
// var cubeArr = [];

// $('.cubeslide_item').each(function(i, el) {
// 	cubeArr.push($(el));
// });

// function cubeslide() {
// 	var $items = $('.cubeslide_item');
// 	$items.removeClass('cubeslide-left cubeslide-prev cubeslide-active cubeslide-next cubeslide-right');

// 	cubeArr[cubeArr.length - 1].addClass('cubeslide-prev');
// 	cubeArr[0].addClass('cubeslide-active');
// 	cubeArr[1].addClass('cubeslide-next');
// 	cubeArr[2].addClass('cubeslide-right');
// 	cubeArr[cubeArr.length - 2].addClass('cubeslide-left');

// 	cubeArr.forEach(function(el, i) {
// 		if (i > 2 && i < cubeArr.length - 2) {
// 			$(el).addClass('cubeslide-right');
// 		}
// 	});

// 	var itemIndex = $('.cubeslide-active').attr('data-cubeslide-index');
// 	vm.cube.use = vm.cube.swiper[itemIndex];
// }
// cubeslide();

// $(document).on('click', '.cubeslide .slide_prev, .modal-cubeModal .slide_prev', function(e) {
// 	cubeArr.unshift(cubeArr[cubeArr.length - 1]);
// 	cubeArr.pop();
// 	cubeslide();
// });

// $(document).on('click', '.cubeslide .slide_next, .modal-cubeModal .slide_next', function(e) {
// 	cubeArr.push(cubeArr[0]);
// 	cubeArr.shift();
// 	cubeslide();
// });

// video slide
var videoArr = [];

$('.video_item').each(function(i, el) {
	videoArr.push($(el));
});

function videoSlide() {
	var $items = $('.video_item');
	$items.removeClass('video-prev video-active video-next');

	if (videoArr.length > 2) {
		videoArr[videoArr.length - 1].addClass('video-prev');
		videoArr[0].addClass('video-active');
		videoArr[1].addClass('video-next');

		videoArr.forEach(function(el, i) {
			if (i > 1 && i < videoArr.length - 1) {
				$(el).addClass('video-next');
			}
		});
	} else {
		videoArr[0].addClass('video-active');
	}
}

videoSlide();

$(document).on('click', '.youtube-video .slide_prev', function(e) {
	videoArr.unshift(videoArr[videoArr.length - 1]);
	videoArr.pop();
	videoSlide();

	vm.videos.active = vm.videos.active - 1;
	if (vm.videos.active < 0) {
		vm.videos.active = vm.videos.items.length - 1;
	}
});

$(document).on('click', '.youtube-video .slide_next', function(e) {
	videoArr.push(videoArr[0]);
	videoArr.shift();
	videoSlide();

	vm.videos.active = vm.videos.active + 1;
	if (vm.videos.active >= vm.videos.items.length) {
		vm.videos.active = 0;
	}
});

// -----------
function viewportDetect(target) {
	var pageX,
		pageY,
		initX,
		initY,
		isTouch = false,
		nowX = 0,
		nowY = 0,
		nowScale,
		lastScale;
	var start = [];
	var $target = target;

	$(document).on('touchstart', $target, function(e) {
		pageX = e.targetTouches[0].pageX;
		pageY = e.targetTouches[0].pageY;
		initX = e.target.offsetLeft;
		initY = e.target.offsetTop;
		if (e.touches.length >= 2) {
			start = e.touches;
		}
		isTouch = true;
	});

	$(document).on('touchmove', $target, function(e) {
		if (e.touches.length == 1 && isTouch) {
			var $elWidth = e.target.offsetWidth;
			var $elHeight = e.target.offsetHeight;
			var targetWidthSpace = ($elWidth * nowScale - $elWidth) / 2;
			var targetHeightSpace = ($elHeight * nowScale - $elHeight) / 2;

			var touchMoveX = e.targetTouches[0].pageX,
				touchMoveY = e.targetTouches[0].pageY;

			nowX = nowX + (parseInt(touchMoveX) - parseInt(pageX)) / 5;
			nowY = nowY + (parseInt(touchMoveY) - parseInt(pageY)) / 5;

			if (nowX > 0 && nowX > targetWidthSpace) {
				nowX = targetWidthSpace;
			}

			if (nowX < 0 && nowX < -targetWidthSpace) {
				nowX = -targetWidthSpace;
			}

			if (nowY > 0 && nowY > targetHeightSpace) {
				nowY = targetHeightSpace;
			}

			if (nowY < 0 && nowY < -targetHeightSpace) {
				nowY = -targetHeightSpace;
			}

			var addTouchMove;
			if ($target.indexOf('leaflets') != -1) {
				addTouchMove = 'translate(' + nowX + 'px, ' + nowY + 'px) scale(' + nowScale.toFixed(2) + ')';
			} else {
				addTouchMove = 'translateX(' + nowX + 'px) scale(' + nowScale.toFixed(2) + ')';
			}

						$("html,body").animate({'scrollTop':addTouchMove});
			/* $(this).css({
				transform: addTouchMove
			}); */
		}

		if (e.touches.length >= 2 && isTouch) {
			var now = e.touches;
			lastScale = nowScale;
			nowScale = getDistance(now[0], now[1]) / getDistance(start[0], start[1]);

			if (nowScale < 1) {
				nowScale = 1;
				nowX = 0;
				nowY = 0;
			}

			if (nowScale > 2) {
				nowScale = 2;
			}

			var addScaleMove;
			if ($target.indexOf('leaflets') != -1) {
				addScaleMove = 'translate(' + nowX + 'px, ' + nowY + 'px) scale(' + nowScale.toFixed(2) + ')';
			} else {
				addScaleMove = 'translateX(' + nowX + 'px) scale(' + nowScale.toFixed(2) + ')';
			}

						$("html,body").animate({'scrollTop':addTouchMove});
/*			$(this).css({
				transform: addScaleMove
			}); */
		}
	});

	$(document).on('touchend', $target, function(e) {
		if (isTouch) {
			isTouch = false;
		}
	});
}

//缩放 勾股定理方法
function getDistance(p1, p2) {
	var x = p2.pageX - p1.pageX,
		y = p2.pageY - p1.pageY;
	return Math.sqrt(x * x + y * y);
}
