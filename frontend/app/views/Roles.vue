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
                    <b-button variant="outline-primary" @click="remove(props.row.role_id)">
                        <b-icon-trash />
                    </b-button>
                </div>
            </template>
        </v-client-table>

        <b-modal id="addRole" size="lg" centered title="Добавить роль" @ok="addok">
            <b-form ref="addForm" @submit.stop.prevent="add" invalid-feedback="Все поля обязательны для заполнения">
                <b-form-group size="md" label="Постановка">
                    <b-form-select v-model="modals.add.show_id" :options="modals.add.shows">
                    </b-form-select>
                </b-form-group>
                <b-form-group size="md" label="Роль">
                    <b-form-input type="text" v-model="modals.add.title" required></b-form-input>
                </b-form-group>
                <b-form-group size="md" label="Базовая зарплата">
                    <b-form-input type="number" v-model="modals.add.salary" required></b-form-input>
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
                        text: 'Роли',
                        href: '/roles',
                        active: true
                    }
                ],
                datatable: {
                    columns: [
                        "role_id",
                        "role_title",
                        "base_salary",
                        "date",
                        "play_name",
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
                        shows: [],
                        show_id: null,
                        title: '',
                        salary: null,
                    },
                },
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            async loadData(data = {}) {
                let dataSet = await api('roles/getAll', {
                    params: data
                });

                dataSet = dataSet.sort((a, b) => b.role_id - a.role_id).map(item => {
                    return {
                        role_id: item.role_id,
                        role_title: item.title,
                        base_salary: item.salary + ' рублей',
                        date: new Date(item.date * 1000).toLocaleDateString(),
                        play_name: item.name,
                        actions: ''
                    }
                })

                this.datatable.data = dataSet
            },

            async preadd() {
                let shows = await api('shows/getAll')
                this.modals.add.shows = shows.map(show => ({
                    value: show.show_id,
                    text: show.name + ' (' + (new Date(show.date * 1000).toLocaleDateString()) + ')',
                }))
                this.$bvModal.show('addRole')
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
                    show_id: parseInt(this.modals.add.show_id),
                    title: this.modals.add.title,
                    salary: parseInt(this.modals.add.salary),
                }
                
                await api('roles/create', data)

                this.$bvModal.hide('addRole');
                this.loadData();
            },

            validate() {
                return this.modals.add.state = this.$refs.addForm.checkValidity();
            },

            async remove(role_id) {
                await api('roles/remove', {
                    role_id
                })
                this.loadData()
            }
        }
    }
</script>
