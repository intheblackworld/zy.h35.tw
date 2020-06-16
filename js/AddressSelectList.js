
var app = window.AddressSeleclList =
{
    AdrressArray: [
                    ['臺北市','中正區','大同區','中山區','松山區','大安區','萬華區','信義區','士林區','北投區','內湖區','南港區','文山區'],
                    ['基隆市','仁愛區','信義區','中正區','中山區','安樂區','暖暖區','七堵區'],
                    ['新北市','萬里區','金山區','板橋區','汐止區','深坑區','石碇區','瑞芳區','平溪區','雙溪區','貢寮區','新店區','坪林區','烏來區','永和區','中和區','土城區','三峽區','樹林區','鶯歌區','三重區','新莊區','泰山區','林口區','蘆洲區','五股區','八里區','淡水區','三芝區','石門區'],
                    ['宜蘭縣','宜蘭','頭城','礁溪','壯圍','員山','羅東','三星','大同','五結','冬山','蘇澳','南澳','釣魚臺列嶼'],
                    ['新竹市','新竹市'],
                    ['新竹縣','竹北','湖口','新豐','新埔','關西','芎林','寶山','竹東','五峰','橫山','尖石','北埔','峨眉'],
                    ['桃園市','中壢區','平鎮區','龍潭區','楊梅區','新屋區','觀音區','桃園區','龜山區','八德區','大溪區','復興區','大園區','蘆竹區'],
                    ['苗栗縣','竹南','頭份','三灣','南庄','獅潭','後龍','通霄','苑裡','苗栗','造橋','頭屋','公館','大湖','泰安','銅鑼','三義','西湖','卓蘭'],
                    ['臺中市','中區','東區','南區','西區','北區','北屯區','西屯區','南屯區','太平區','大里區','霧峰區','烏日區','豐原區','后里區','石岡區','東勢區','和平區','新社區','潭子區','大雅區','神岡區','大肚區','沙鹿區','龍井區','梧棲區','清水區','大甲區','外埔區','大安區'],
                    ['彰化縣','彰化','芬園','花壇','秀水','鹿港','福興','線西','和美','伸港','員林','社頭','永靖','埔心','溪湖','大村','埔鹽','田中','北斗','田尾','埤頭','溪州','竹塘','二林','大城','芳苑','二水'],
                    ['南投縣','南投','中寮','草屯','國姓','埔里','仁愛','名間','集集','水里','魚池','信義','竹山','鹿谷'],
                    ['嘉義市','嘉義市'],
                    ['嘉義縣','番路','梅山','竹崎','阿里山','中埔','大埔','水上','鹿草','太保','朴子','六腳','新港','民雄','大林','溪口','義竹','布袋','東石'],
                    ['雲林縣','斗南','大埤','虎尾','土庫','褒忠','東勢','臺西','崙背','麥寮','斗六','林內','古坑','莿桐','西螺','二崙','北港','水林','口湖','四湖','元長'],
                    ['臺南市','中西區','東區','南區','北區','安平區','安南區','永康區','歸仁區','新化區','左鎮區','玉井區','楠西區','南化區','仁德區','關廟區','龍崎區','官田區','麻豆區','佳里區','西港區','七股區','將軍區','學甲區','北門區','新營區','後壁區','白河區','東山區','六甲區','下營區','柳營區','鹽水區','善化區','大內區','山上區','新市區','安定區'],
                    ['高雄市','新興區','前金區','苓雅區','鹽埕區','鼓山區','旗津區','前鎮區','三民區','楠梓區','小港區','左營區','仁武區','大社區','岡山區','路竹區','阿蓮區','田寮區','燕巢區','橋頭區','梓官區','彌陀區','永安區','湖內區','鳳山區','大寮區','林園區','鳥松區','大樹區','旗山區','美濃區','六龜區','內門區','杉林區','甲仙區','桃源區','那瑪夏區','茂林區','茄萣區'],
                    ['南海諸島','東沙','南沙'],
                    ['澎湖縣','馬公','西嶼','望安','七美','白沙','湖西'],
                    ['屏東縣','屏東','三地門','霧臺','瑪家','九如','里港','高樹','鹽埔','長治','麟洛','竹田','內埔','萬丹','潮州','泰武','來義','萬巒','崁頂','新埤','南州','林邊','東港','琉球','佳冬','新園','枋寮','枋山','春日','獅子','車城','牡丹','恆春','滿州'],
                    ['臺東縣','臺東','綠島','蘭嶼','延平','卑南','鹿野','關山','海端','池上','東河','成功','長濱','太麻里','金峰','大武','達仁'],
                    ['花蓮縣','花蓮','新城','秀林','吉安','壽豐','鳳林','光復','豐濱','瑞穗','萬榮','玉里','卓溪','富里'],
                    ['金門縣','金沙','金湖','金寧','金城','烈嶼','烏坵'],
                    ['連江縣','南竿','北竿','莒光','東引']
                  ]
    ,

    defaultOptionCityText: '請選擇居住城市',
    defaultOptionCityValue: '',
    defaultOptionAreaText: '請選擇居住區域',
    defaultOptionAreaValue: '',
    
    Initialize: function (city, area, defaultCityText, defaultCityValue, defaultAreaText, defaultAreaValue) {

        var cityText = defaultCityText ? defaultCityText : this.defaultOptionCityText;
        var cityValue = defaultAreaValue ? defaultAreaValue : this.defaultOptionCityValue;
        var areaText = defaultAreaText ? defaultAreaText : this.defaultOptionAreaText;
        var areaValue = defaultAreaValue ? defaultAreaValue : this.defaultOptionAreaValue;

        var citySelect = document.getElementById(city);
        var areaSelect = document.getElementById(area);

        citySelect.options[0] = new Option(cityText, cityValue);
        areaSelect.options[0] = new Option(areaText, areaValue);
        for (var i = 0; i < this.AdrressArray.length; i++) {
            citySelect.options[i + 1] = new Option(this.AdrressArray[i][0], this.AdrressArray[i][0]);
        }
        citySelect.addEventListener ? citySelect.addEventListener('change', function (e) { app.AppendArea(e, areaSelect, areaText, areaValue) }, false) : citySelect.attachEvent('onchange', function (e) { app.AppendArea(e, areaSelect, areaText, areaValue) });
    },

    AppendArea: function (e, AreaSelect, areaText, areaValue) {
        var target = e.target ? e.target : e.srcElement;
        if (target.selectedIndex == 0) {
            AreaSelect.options.length = 0;
            AreaSelect.options[0] = new Option(areaText, areaValue);
            return;
        }
        AreaSelect.options.length = this.AdrressArray[target.selectedIndex - 1].length - 1;
        for (var i = 1; i < this.AdrressArray[target.selectedIndex - 1].length; i++) {
            AreaSelect.options[i - 1] = new Option(this.AdrressArray[target.selectedIndex - 1][i], this.AdrressArray[target.selectedIndex - 1][i]);
        }
    },

    ReturnSelectAddress: function (city, area) {
        var city = document.getElementById(city);
        var area = document.getElementById(area);
        return city.value + area.value;
    }
};
