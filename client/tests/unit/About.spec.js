import Vue from 'vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)


import About from '@/views/About.vue'

import {
    mount,
    createLocalVue
} from '@vue/test-utils';


const localVue = createLocalVue()


describe('About', () => {

    let vuetify;

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    test('Проверка снапшота', () => {
        const wrapper = mount(About, {
            localVue,
            vuetify
        })

        expect(wrapper.html()).toMatchSnapshot();
        
        const h3 = wrapper.find('h3')
        expect(h3.text()).toBe('Демо проект Александра Коротаева')

        const h4 = wrapper.find('h4')
        expect(h4.text()).toBe('(с) 2020')

    })
})