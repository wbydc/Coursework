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
                    <b-button variant="outline-primary" v-b-modal.addPlay>
                        Добавить
                    </b-button>
                </div>
            </template>
            <template slot="actions" scope="props">
                <div>
                    <b-button variant="outline-primary" @click="remove(props.row.play_id)">
                        <b-icon-trash />
                    </b-button>
                </div>
            </template>
        </v-client-table>

        <b-modal id="addPlay" size="lg" centered title="Добавить спектакль" @ok="addok">
            <b-form ref="addForm" @submit.stop.prevent="add" invalid-feedback="Все поля обязательны для заполнения">
                <b-form-group size="md" label="Название">
                    <b-form-input type="text" v-model="modals.add.name" required></b-form-input>
                </b-form-group>
                <b-form-group size="md" label="Бюджет">
                    <b-form-input type="number" v-model="modals.add.budget" required></b-form-input>
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
                        text: 'Спектакли',
                        href: '/shows',
                        active: true
                    }
                ],
                datatable: {
                    columns: [
                        "play_id",
                        "name",
                        "budget",
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
                        name: '',
                        budget: '',
                    },
                },
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            async loadData(data = {}) {
                let dataSet = await api('plays/getAll', {
                    params: data
                });

                dataSet = dataSet.sort((a, b) => b.play_id - a.play_id).map(item => {
                    return {
                        play_id: item.play_id,
                        name: item.name,
                        budget: item.budget + ' рублей',
                        actions: ''
                    }
                })

                this.datatable.data = dataSet
            },

            addok(event) {
                event.preventDefault()
                this.add()
            },
            async add() {
                if (!this.validate()) {
                    return
                }

                let data = this.modals.add
                data.budget = parseInt(data.budget)

                await api('plays/create', data)

                this.$bvModal.hide('addPlay');
                this.loadData();
            },

            validate() {
                return this.modals.add.state = this.$refs.addForm.checkValidity();
            },

            async remove(play_id) {
                await api('plays/remove', {
                    play_id
                })
                this.loadData()
            }
        }
    }
</script>
