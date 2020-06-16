function removeSaveMsg(vm) {
    var that = vm;
    var timer;

    timer = setTimeout(function() {
        that.status.save = null;
        that.msg.save = null;

        clearTimeout(timer);
    }, 3600);
}

function range(start, end) {
    return Array(end - start + 1).fill().map(function (_, idx) {
        return start + idx;
    });
}

function pad_left(num, len) {
    if ((num + "").length >= len) {
        return num;
    }

    return pad_left("0" + num, length)
}

function bookingStatus(booking) {
    let res = '';

    switch (+booking) {
        case 1 :
            res = '已約時間';
            break;

        case 2 :
            res = '已取消';
            break;

        case 3 :
            res = '客戶失約';
            break;

        case 4 :
            res = '已完成看屋';
            break;

        default:
            res = '未聯繫';
    }

    return res;
}

const $loader = $('.loader');

const api = {
    account: 'api/account.php',
    booking: 'api/booking.php',
    email: 'api/email.php'
};

const regexer = {
    txt1: /^.{1,}/,
    txt3: /^.{3,}/,
    txt8: /^.{8,}/,
    txt10: /^.{10,}/,
    txt300: /^.{300,}/,
    img: /^.{1,}\.(gif|jpg|jpeg|bmp|png)$/,
    num: /^[1-9]{1}[\d]{0,}/,
    url: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
    email: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
};

Vue.component('notice', {
    template: "<div class=\"notice\">\n" +
        "<strong><slot name='strong'></slot></strong><br>\n" +
        "<slot name='msg'></slot>\n" +
        "</div>"
});

const Justice = {
    list(service = null, data = null) {
        if (service) {
            window.vm = new Vue({
                el: '#app',
                data: {
                    page: {
                        now: 1,
                        rows: 20,
                        total: 0,
                        start: 0,
                        end: 0,
                        last: false
                    },

                    items: data,
                    itemsOnRange: [],

                    status: {
                        save: null
                    },

                    msg: {
                        save: null
                    }
                },

                beforeMount() {
                    var p = this.getParamFromURL('p');
                    p = p || 1;

                    this.page.total = Math.ceil(this.items.length / this.page.rows);
                    this.page.rows = (this.page.rows > this.items.length) ? this.items.length : this.page.rows;

                    this.getDataByRangeAfterChanged(p);
                },

                methods: {
                    bookingStatus(booking) {
                        return bookingStatus(booking);
                    },

                    range : function (start, end) {
                        return range(start, end);
                    },

                    getParamsFromURL: function() {
                        var params = location.search;
                        params = params.split('?')[1];
                        params = params ? params.split('&') : false;

                        return params;
                    },

                    getParamFromURL: function(param) {
                        var that = this;
                        var params = that.getParamsFromURL();

                        if (params) {
                            var r = false;

                            if (param) {
                                param = param + '=';

                                $.each(params, function(index, value) {
                                    var m = value.match(param);

                                    if (m && !m.index) {
                                        r = value.split('=')[1];
                                        return false;
                                    }
                                });
                            }

                            return +r;
                        }
                    },

                    getDataByRangeAfterChanged: function(p) {
                        this.page.now = p;

                        this.page.start = (this.page.now - 1) * this.page.rows;
                        this.page.end = this.page.start + this.page.rows;

                        this.itemsOnRange = this.items.slice(this.page.start, this.page.end);
                        window.history.pushState(null, null, "?p=" + p);

                        $.move2Position(0);
                    },

                    getDataByRangeAfterChanged: function(p) {
                        this.page.now = p;

                        this.page.start = (this.page.now - 1) * this.page.rows;
                        this.page.end = this.page.start + this.page.rows;

                        this.itemsOnRange = this.items.slice(this.page.start, this.page.end);
                        window.history.pushState(null, null, "?p=" + p);

                        $.move2Position(0);
                    },

                    changePageRange: function(redirect) {
                        var that = this;
                        window.history.pushState(null, null, "?p=" + that.page.now);

                        var params = that.getParamsWithoutParam('p');
                        params = params.length ? '?' + params + '&' : '?';

                        if (redirect) {
                            location.href = location.origin + location.pathname + params + 'p=' + this.page.now;
                        } else {
                            this.getDataByRangeAfterChanged(this.page.now);
                        }
                    },

                    pageItem: function(v) {
                        return v;
                    },

                    pageSwitch: function(p) {
                        this.page.now = +p;
                    },

                    pagePrev: function() {
                        var p = this.page.now;

                        p--;
                        if (p <= 0) p = 1;

                        this.getDataByRangeAfterChanged(p);

                    },

                    pageNext: function() {
                        var p = this.page.now;

                        p++;
                        if (p >= this.page.total) p = this.page.total;

                        this.getDataByRangeAfterChanged(p);
                    },

                    dele: function(id, name, key) {
                        var that = this;

                        if (id) {
                            var apiUrl = api[service] + '?delete=' + id;

                            if (confirm('是否要刪除「' + name + '」這筆資料？')) {

                                $.ajax({
                                    type: 'GET',
                                    url: apiUrl,
                                    async: false,

                                    error: function(xhr, ajaxOptions, thrownError) {
                                        that.status.save = 'error';
                                        that.msg.save = xhr.responseText;

                                        removeSaveMsg(that);
                                    },

                                    success: function(res) {
                                        that.status.save = 'success';
                                        that.msg.save = '您已成功刪除「' + name + '」這筆資料。';

                                        that.items.splice(key, 1);

                                        removeSaveMsg(that);
                                    }
                                });

                            }
                        }
                    },

                    downloadXLSX() {
                        const that = this;
                        const date = new Date();
                        const filename = 'justice_' + date.getFullYear() + pad_left(date.getMonth() + 1, 2) + pad_left(date.getDay()) + pad_left(date.getHours()) + pad_left(date.getMinutes()) + pad_left(date.getSeconds()) + '.xlsx';
                        const items = that.items;
                        const wb = XLSX.utils.book_new();

                        const sheetName = '預約看屋';

                        let output = [
                            ['流水號', '客戶姓名', '縣市', '行政區', '職業', '聯絡電話', '聯絡信箱', '客戶訊息', '預約狀態', '備註'], //title
                        ];

                        for (let key in items) {
                            const item = items[key];

                            output.push(
                                [
                                    item.id,
                                    item.name,
                                    item.city,
                                    item.district,
                                    item.job,
                                    item.phone,
                                    item.email,
                                    item.message,
                                    that.bookingStatus(item.booking),
                                    item.note
                                ]
                            );
                        }

                        let ws = XLSX.utils.aoa_to_sheet(output);

                        for (let cell in ws) {
                            const c = ws[cell];

                            if (/^(B|F|I)/.test(cell) && /^(B|F|I)1$/.test(cell)) {
                                c.t = "s";
                            }
                        }

                        XLSX.utils.book_append_sheet(wb, ws, sheetName);

                        XLSX.writeFile(wb, filename);
                    }
                }
            });
        }
    },

    handler(service = null, id = null) {
        if (service) {
            window.vm = new Vue({
                el: '#app',
                data: {
                    form: {
                        name: '',
                        new_password: null,
                        city_id: '',
                        district_id: '',
                        phone: '',
                        email: '',
                        message: '',
                        note: '',
                        grade: '1',
                        status: '1'
                    },

                    status: {
                        save: null,
                        menu: false,
                        usableSubmit: false,
                        email: null
                    },

                    validation: {
                        account: {
                            email: false,
                            new_password: false
                        }
                    },

                    validationRules: {
                        email: regexer.email,
                        new_password: regexer.txt8,
                    },

                    hasError: {
                        email: false,
                        new_password: false,
                    },

                    msg: {
                        save: null,
                        email: '這個 Email 已被使用！'
                    },

                    error: {
                        email: false
                    }
                },

                beforeMount() {
                    const that = this;

                    if (id) {
                        const apiUrl = api[service] + '?read&id=' + id;

                        $.ajax({
                            url: apiUrl,
                            method: 'GET',
                            dataType: 'json',
                            async: false,

                            error: function(xhr, ajaxOptions, thrownError) {
                                console.log(xhr.responseText);
                            },

                            success: function(res) {
                                res = typeof res === 'object' ? res : JSON.parse(res);
                                that.form = res;

                                if (service === 'booking') {
                                    that.form.area = that.form.city + that.form.district;
                                }

                                if (service === 'account') {
                                    that.form.new_password = '';
                                }
                            }
                        });

                        if (service === 'account') {
                            delete that.validation.account.new_password;
                            delete that.validationRules.new_password;
                        }

                        that.validator();
                    }
                },

                methods: {
                    validator: function() {
                        const that = this;
                        let verified = false;

                        $.each(that.validation[service], function(index, value) {
                            let checked = that.form[index] && that.validationRules[index].test(that.form[index]);

                            that.validation[service][index] = checked;
                            that.hasError[index] = !checked;
                        });

                        $.each(that.validation[service], function(index, value) {
                            verified = true;

                            if (!value) {
                                verified = false;
                                return false;
                            }
                        });

                        that.status.usableSubmit = verified;
                    },

                    eMailValidator() {
                        const that = this;

                        $.ajax({
                            url: api['email'] + '?e=' + that.form.email,
                            error: function(xhr, ajaxOptions, thrownError) {
                                $loader.removeClass('is:on');

                                that.status.save = 'error';
                                that.msg.save = xhr.responseText;

                                removeSaveMsg(that);
                            },

                            success: function(res) {
                                that.error.email = +res ? true : false;
                            }
                        })
                    },

                    save() {
                        const that = this;
                        let apiUrl = api[service];

                        $loader.addClass('is:on');

                        apiUrl = id ? apiUrl + '?update&id=' + id : apiUrl + '?create';

                        $.ajax({
                            url: apiUrl,
                            method: 'POST',
                            dataType: 'json',
                            data: {
                                mData: JSON.stringify(that.form)
                            },
                            async: false,

                            error: function(xhr, ajaxOptions, thrownError) {
                                $loader.removeClass('is:on');

                                that.status.save = 'error';
                                that.msg.save = xhr.responseText;

                                removeSaveMsg(that);
                            },

                            success: function(res) {
                                $loader.removeClass('is:on');

                                if (id) {
                                    that.status.save = 'success';
                                    that.msg.save = '系統已經成功儲存這筆資料！';

                                    removeSaveMsg(that);
                                } else {
                                    var tmpID = null;

                                    if (typeof res === 'number') {
                                        tmpID = res;
                                    } else if (typeof res === 'object') {
                                        tmpID = res.new_id;
                                    }

                                    location.href = location.href + '?id=' + tmpID;
                                }
                            }
                        });
                    },

                    generatePassword() {
                        this.form.new_password = $.Password.generate(12);
                    }
                }
            });
        }
    },

    login() {
        window.vm = new Vue({
            el: '#app',
            data: {
                email: null,
                password: null,
                recaptch: null,
                usableSubmit: false
            },

            methods: {
                validate() {
                    let email = regexer.email.test(this.email);
                    let password = regexer.txt8.test(this.password);
                    let recaptch = regexer.txt300.test(this.recaptch);

                    this.usableSubmit = email && password && recaptch ? true : false
                }
            }
        });
    },

    move2Position: function(pos, callback) {
        $('html, body').stop().animate({
            'scrollTop': pos
        }, 650, callback);
    },

    Password: {
        _pattern : /[\w\!\@\#\$\%\^\&\*\(\)\[\]\{\}\"\'\+\-\,\.\/\:\;\<\>\=\\\`\|\~\?]/,

        _getRandomByte : function() {
            if(window.crypto && window.crypto.getRandomValues) {
                var result = new Uint8Array(1);
                window.crypto.getRandomValues(result);
                return result[0];
            } else if(window.msCrypto && window.msCrypto.getRandomValues) {
                var result = new Uint8Array(1);
                window.msCrypto.getRandomValues(result);
                return result[0];
            } else {
                return Math.floor(Math.random() * 256);
            }
        },

        generate : function(length) {
            return Array.apply(null, {'length': length})
                .map(function() {
                    var result;

                    while(true) {
                        result = String.fromCharCode(this._getRandomByte());

                        if(this._pattern.test(result)) {
                            return result;
                        }
                    }
                }, this).join('');
        }
    },

    common() {
        $(window).on('load', () => {
            var timer;

            timer = setTimeout(()=>{
                $('body').addClass('loaded');
                $('.loader').addClass('is\:off');

                clearTimeout(timer);
            }, 1000);
        });
    }
};

$.extend(true, Justice);
$.common();
