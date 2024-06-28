import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    noTaskFr: [],
    noTaskFrNum: 0,
    noTaskFrNextPage: '',
    archiveFr: [],
    archiveFrNum: 0,
    archiveFrNextPage: '',
    planFr: [],
    planFrNum: 0,
    planFrNextPage: '',
    zoomFr: [],
    zoomFrNum: 0,
    zoomFrNextPage: '',
    anketaFr: [],
    anketaFrNum: 0,
    anketaFrNextPage: '',
    contractFr: [],
    contractFrNum: 0,
    contractFrNextPage: '',
    prepaidFr: [],
    prepaidFrNum: 0,
    prepaidFrNextPage: '',
    loadNoTaskFr: true,
    loadArchiveFr: true,
    loadPlanFr: true,
    loadZoomFr: true,
    loadAnketaFr: true,
    loadContractFr: true,
    loadPrepaidFr: true,
};

const MyClientsFrSlice = createSlice({
    name: 'MyClientsFrSlice',
    initialState,

    reducers: {
        //все клиенты руководителя экспертов 
        //Без задач
        setNoTaskFr(state, action) {
            state.noTaskFr = action.payload;
        },

        setAddNoTaskFr(state, action) {
            state.noTaskFr = [...state.noTaskFr, ...action.payload];
        },

        setNoTaskFrNum(state, action) {
            state.noTaskFrNum = action.payload;
        },

        setNoTaskFrNextPage(state, action) {
            state.noTaskFrNextPage = action.payload;
        },

        setLoadNoTaskFr(state, action) {
            state.loadNoTaskFr = action.payload;
        },

        //В архив
        setArchiveFr(state, action) {
            state.archiveFr = action.payload;
        },

        setAddArchiveFr(state, action) {
            state.archiveFr = [...state.archiveFr, ...action.payload];
        },

        setArchiveFrNum(state, action) {
            state.archiveFrNum = action.payload;
        },

        setArchiveFrNextPage(state, action) {
            state.archiveFrNextPage = action.payload;
        },

        setLoadArchiveFr(state) {
            state.loadArchiveFr = false;
        },


        //Планирование встречи
        setPlanFr(state, action) {
            state.planFr = action.payload;
        },

        setAddPlanFr(state, action) {
            state.planFr = [...state.planFr, ...action.payload];
        },

        setPlanFrNum(state, action) {
            state.planFrNum = action.payload;
        },

        setPlanFrNextPage(state, action) {
            state.planFrNextPage = action.payload;
        },

        setLoadPlanFr(state) {
            state.loadPlanFr = false;
        },

        //Zoom
        setZoomFr(state, action) {
            state.zoomFr = action.payload;
        },

        setAddZoomFr(state, action) {
            state.zoomFr = [...state.zoomFr, ...action.payload];
        },

        setZoomFrNum(state, action) {
            state.zoomFrNum = action.payload;
        },

        setZoomFrNextPage(state, action) {
            state.zoomFrNextPage = action.payload;
        },

        setLoadZoomFr(state) {
            state.loadZoomFr = false;
        },

        //Анкета
        setAnketaFr(state, action) {
            state.anketaFr = action.payload;
        },

        setAddAnketaFr(state, action) {
            state.anketaFr = [...state.anketaFr, ...action.payload];
        },

        setAnketaFrNum(state, action) {
            state.anketaFrNum = action.payload;
        },

        setAnketaFrNextPage(state, action) {
            state.anketaFrNextPage = action.payload;
        },

        setLoadAnketaFr(state) {
            state.loadAnketaFr = false;
        },

        //Договор
        setСontractFr(state, action) {
            state.contractFr = action.payload;
        },

        setAddСontractFr(state, action) {
            state.contractFr = [...state.contractFr, ...action.payload];
        },

        setСontractFrNum(state, action) {
            state.contractFrNum = action.payload;
        },

        setСontractFrNextPage(state, action) {
            state.contractFrNextPage = action.payload;
        },

        setLoadContractFr(state) {
            state.loadContractFr = false;
        },

        //Предоплата

        setPrepaidFr(state, action) {
            state.prepaidFr = action.payload;
        },

        setAddPrepaidFr(state, action) {
            state.prepaidFr = [...state.prepaidFr, ...action.payload];
        },

        setPrepaidFrNum(state, action) {
            state.prepaidFrNum = action.payload;
        },

        setPrepaidFrNextPage(state, action) {
            state.prepaidFrNextPage = action.payload;
        },

        setLoadPrepaidFr(state) {
            state.loadPrepaidFr = false;
        },
        


    },
});

export const {
    setNoTaskFr,
    setAddNoTaskFr,
    setNoTaskFrNum,
    setNoTaskFrNextPage,
    setLoadNoTaskFr,
    setArchiveFr,
    setAddArchiveFr,
    setArchiveFrNum,
    setArchiveFrNextPage,
    setLoadArchiveFr,
    setPlanFr,
    setAddPlanFr,
    setPlanFrNum,
    setPlanFrNextPage,
    setLoadPlanFr,
    setZoomFr,
    setAddZoomFr,
    setZoomFrNum,
    setZoomFrNextPage,
    setLoadZoomFr,
    setAnketaFr,
    setAddAnketaFr,
    setAnketaFrNum,
    setAnketaFrNextPage,
    setLoadAnketaFr,
    setСontractFr,
    setAddСontractFr,
    setСontractFrNum,
    setСontractFrNextPage,
    setLoadContractFr,
    setPrepaidFr,
    setAddPrepaidFr,
    setPrepaidFrNum,
    setPrepaidFrNextPage,
    setLoadPrepaidFr

} = MyClientsFrSlice.actions;

export default MyClientsFrSlice.reducer;
