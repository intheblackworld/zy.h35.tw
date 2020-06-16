<template v-if="page.total > 1">
    <hr class="hr-double-line sz:3x">
    <div class="pagi f-align:c">
        <div class="pagi_ctrls :bordered :united">
            <button class="pagi_item" :disabled="page.now === 1" @click="pagePrev">
                <i class="icon fas fa-chevron-left"></i>
            </button>
            <span class="pagi_num">
                {{page.now}} / {{page.total}} <i class="caret"></i>
                <select class="pagi_select" v-model="page.now" @change="changePageRange(false)">
                    <option v-for="v in page.total" :value="v" :selected="v == page.now">{{v}}</option>
                </select>
            </span>
            <button class="pagi_item" :disabled="page.now === page.total" @click="pageNext">
                <i class="icon fas fa-chevron-right"></i>
            </button>
        </div>
    </div>
</template>
