<template>
    <div>
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>

        <v-client-table
            :columns="datatable.columns"
            :data="datatable.data"
            :options="datatable.options"
        >
            <template slot="afterFilter">
                <div>
                    <br>
                    &nbsp;
                    <b-button variant="outline-primary" @click="preadd()">
                        Добавить
                    </b-button>
                </div>
            </template>
            <template slot="actions" scope="props">
                <div>
                    <b-button variant="outline-primary" @click="alert(props.row.actor_id)">
                        <b-icon-pencil />
                    </b-button>
                    <b-button variant="outline-primary" @click="remove(props.row.show_id)">
                        <b-icon-trash />
                    </b-button>
                </div>
            </template>
        </v-client-table>

        <b-modal id="addShow" size="lg" centered title="Добавить постановку" @ok="addok">
            <b-form ref="addForm" @submit.stop.prevent="add" invalid-feedback="Все поля обязательны для заполнения">
                <b-form-group size="md" label="Спектакль">
                    <b-form-select v-model="modals.add.play_id" :options="modals.add.plays">
                    </b-form-select>
                </b-form-group>
                <b-form-group size="md" label="Дата">
                    <b-form-input type="date" v-model="modals.add.date" required></b-form-input>
                </b-form-group>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
    import api from '../helpers/api';

    export default {
        data() {
            return {
                breadcrumbs: [
                    {
                        text: 'Постановки',
                        href: '/shows',
                        active: true
                    }
                ],
                datatable: {
                    columns: [
                        "show_id",
                        "name",
                        "date",
                        "actions"
                    ],
                    data: [],
                    options: {
                        requestFunction: this.loadData
                    }
                },
                modals: {
                    add: {
                        state: null,
                        plays: [],
                        play_id: null,
                        date: '',
                    },
                },
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            async loadData(data = {}) {
                let dataSet = await api('shows/getAll', {
                    params: data
                });

                dataSet = dataSet.sort((a, b) => b.show_id - a.show_id).map(item => {
                    return {
                        show_id: item.show_id,
                        name: item.name,
                        date: new Date(item.date * 1000).toLocaleDateString(),
                        actions: ''
                    }
                })

                this.datatable.data = dataSet
            },

            async preadd() {
                let plays = await api('plays/getList')
                this.modals.add.plays = plays.map(play => ({
                    value: play.play_id,
                    text: play.name
                }))
                this.$bvModal.show('addShow')
            },

            addok(event) {
                event.preventDefault()
                this.add()
            },
            async add() {
                if (!this.validate()) {
                    return
                }

                let data = {
                    play_id: parseInt(this.modals.add.play_id),
                    date: this.modals.add.date
                }
                data.date = Math.floor((new Date(...data.date.split(':').reverse()) || Date.now()) / 1000);
                
                await api('shows/create', data)

                this.$bvModal.hide('addShow');
                this.loadData();
            },

            validate() {
                return this.modals.add.state = this.$refs.addForm.checkValidity();
            },

            async remove(show_id) {
                await api('shows/remove', {
                    show_id
                })
                this.loadData()
            }
        }
    }
</script>
