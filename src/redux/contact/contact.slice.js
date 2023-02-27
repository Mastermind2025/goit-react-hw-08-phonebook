import { createSlice } from '@reduxjs/toolkit';
import { contactsInitState } from './contact.init-state';
import Notiflix from 'notiflix';
import { addContactThunk, deleteContactThunk, fetchContacts, refreshContactThunk } from './contact.thunk';
import { STATUS } from 'constans/status.constans';

const contactSlice = createSlice({
    name: 'contacts',
    initialState: contactsInitState,
    extraReducers: builder => {
        builder.addCase(fetchContacts.pending, state => {
            state.isLoading = true;
            state.status = STATUS.loading;
           
        }).addCase(fetchContacts.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.items = payload;
            state.error = null;
            state.status = STATUS.success;
        }).addCase(fetchContacts.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
            state.status = STATUS.error;
        })
            .addCase(addContactThunk.pending, state => {
                state.isLoading = true;
                state.status = STATUS.loading;
        }).addCase(addContactThunk.fulfilled, (state, { payload }) => {
            state.status = STATUS.success;
            state.isLoading = false;
            state.items.push(payload);
            
              

       
           
        }).addCase(addContactThunk.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
            state.status = STATUS.error;
        })
            .addCase(deleteContactThunk.pending, state => {
                state.isLoading = true;
                state.status = STATUS.loading;
        }).addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
            state.status = STATUS.success;
           
            Notiflix.Notify.success('Your contact deleted successfully!');
            state.isLoading = false;
            const i = state.items.findIndex(item => item.contactId !== payload.contactId);
            state.items.splice(i, 1);
        }).addCase(deleteContactThunk.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
            state.status = STATUS.error;
        })
            .addCase(refreshContactThunk.pending, state => {
                state.isLoading = true;
                state.status = STATUS.loading;
        }).addCase(refreshContactThunk.fulfilled, (state, { payload }) => {
            state.status = STATUS.success;
            state.isLoading = false;
            const { id, name, number } = payload;
            const i = state.items.findIndex(item => item.id === id);
            state.items[i] = { id, name, number }
            Notiflix.Notify.success('Your contact was update successfully!');
        }).addCase(refreshContactThunk.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
            state.status = STATUS.error;
        })
    }

});

export const contactsReducer = contactSlice.reducer;