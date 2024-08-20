import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    today: [],
    todayNum: 0,
    todayNextPage: '',
    new: [],
    newNum: 0,
    newNextPage: '',
    no_task: [],
    archive: [],
    plan_meeting: [],
    planNum: 0,
    planNextPage: '',
    zoom: [],
    anketa: [],
    contract: [],
    prepaid: [],
    cours: [],
    favorite: [],
    loadToday: true,
    loadNew: true,
    loadNoTask: true,
    loadArchive: true,
    loadPlanMeeting: true,
    loadZoom: true,
    loadAnketa: true,
    loadContract: true,
    loadPrepaid: true,
    loadFavorite: true,
    loadCours: true,
};

const MyClientsSlice = createSlice({
    name: 'MyClientsSlice',
    initialState,

    reducers: {
        setClientsToday(state, action) {
            state.today = action.payload;
        },
        setClientsTodayAdd(state, action) {
            state.today = [...state.today, ...action.payload];
        },

        setClientsNum(state, action) {
            state.todayNum = action.payload;
        },

        setTodayNextPage(state, action) {
            state.todayNextPage = action.payload;
        },

        setClientsNew(state, action) {
            state.new = action.payload;
        },

        setClientsNewAdd(state, action) {
            state.new = [...state.new, ...action.payload];
        },

        setClientsNewNum(state, action) {
            state.newNum = action.payload;
        },

        setNewNextPage(state, action) {
            state.newNextPage = action.payload;
        },

        setClientsNoTask(state, action) {
            state.no_task = action.payload /* [...state.no_task, ...action.payload] */;
        },

        setClientsArchive(state, action) {
            state.archive = action.payload /* [...state.archive, ...action.payload] */;
        },

        setPlanMeeting(state, action) {
            state.plan_meeting = action.payload;
        },

        setPlanMeetingAdd(state, action) {
            state.plan_meeting = [...state.plan_meeting, ...action.payload];
        },

        setPlanNum(state, action) {
            state.planNum = action.payload;
        },

        setPlanNextPage(state, action) {
            state.planNextPage = action.payload;
        },

        setZoom(state, action) {
            state.zoom = action.payload /* [...state.zoom, ...action.payload] */;
        },

        setAnketa(state, action) {
            state.anketa = action.payload /* [...state.zoom, ...action.payload] */;
        },

        setContract(state, action) {
            state.contract = action.payload /* [...state.zoom, ...action.payload] */;
        },

        setPrepaid(state, action) {
            state.prepaid = action.payload /* [...state.zoom, ...action.payload] */;
        },

        setCours(state, action) {
            state.cours = action.payload;
        },

        setFavorite(state, action) {
            state.favorite = action.payload /* [...state.zoom, ...action.payload] */;
        },

        setFavorite(state, action) {
            state.favorite = action.payload /* [...state.zoom, ...action.payload] */;
        },

        setAddFavorite(state, action) {
            state.favorite = [...state.favorite, action.payload] /* [...state.zoom, ...action.payload] */;
        },

        setRemoveFavorite(state, action) {
            state.favorite = [...state.favorite].filter(el => el.id !== action.payload.id)/* [...state.zoom, ...action.payload] */;
        },

        

        setLoadToday(state, action) {
            state.loadToday = action.payload;
        },

        setLoadNew(state, action) {
            state.loadNew = action.payload;
        },

        setLoadNoTask(state) {
            state.loadNoTask = false;
        },

        setLoadArchive(state) {
            state.loadArchive = false;
        },

        setLoadPlanMeeting(state) {
            state.loadPlanMeeting = false;
        },

        setLoadZoom(state) {
            state.loadZoom = false;
        },

        setLoadAnketa(state) {
            state.loadAnketa = false;
        },

        setLoadContract(state) {
            state.loadContract = false;
        },

        setLoadPrepaid(state) {
            state.loadPrepaid = false;
        },

        setLoadFavorite(state) {
            state.loadFavorite = false;
        },

        setLoadCours(state) {
            state.loadCours = false;
        },
    },
});

export const {
    setClientsToday,
    setClientsTodayAdd,
    setClientsNum,
    setClientsNewAdd,
    setTodayNextPage,
    setLoadNew,
    setClientsNew,
    setClientsNewNum,
    setNewNextPage,
    setClientsNoTask,
    setClientsArchive,
    setPlanMeeting,
    setPlanMeetingAdd,
    setPlanNum,
    setPlanNextPage,
    setZoom,
    setAnketa,
    setContract,
    setPrepaid,
    setCours,
    setLoadCours,
    setFavorite,
    setLoadToday,
    setLoadNoTask,
    setLoadArchive,
    setLoadPlanMeeting,
    setLoadZoom,
    setLoadAnketa,
    setLoadContract,
    setLoadPrepaid,
    setLoadFavorite,
    setAddFavorite,
    setRemoveFavorite,

} = MyClientsSlice.actions;

export default MyClientsSlice.reducer;
