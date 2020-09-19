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
                    <b-button variant="outline-primary" v-b-modal.addActor>
                        Добавить
                    </b-button>
                </div>
            </template>
            <template slot="actions" scope="props">
                <div>
                    <b-button variant="outline-primary" @click="alert(props.row.actor_id)">
                        <b-icon-pencil />
                    </b-button>
                    <b-button variant="outline-primary" @click="remove(props.row.actor_id)">
                        <b-icon-trash />
                    </b-button>
                </div>
            </template>
        </v-client-table>

        <b-modal id="addActor" size="lg" centered title="Добавить актёра" @ok="addok">
            <b-form ref="addForm" @submit.stop.prevent="add" invalid-feedback="Все поля обязательны для заполнения">
                <b-form-group size="md" label="Фамилия">
                    <b-form-input type="text" v-model="modals.add.lastname" required></b-form-input>
                </b-form-group>
                <b-form-group size="md" label="Имя">
                    <b-form-input type="text" v-model="modals.add.firstname" required></b-form-input>
                </b-form-group>
                <b-form-group size="md" label="Отчество">
                    <b-form-input type="text" v-model="modals.add.middlename" required></b-form-input>
                </b-form-group>
                <b-form-group size="md" label="Звание">
                    <b-form-input type="text" v-model="modals.add.rank" required></b-form-input>
                </b-form-group>
                <b-form-group size="md" label="Опыт">
                    <b-form-input type="number" v-model="modals.add.experience" required></b-form-input>
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
                        text: 'Актёры',
                        href: '/actors',
                        active: true
                    }
                ],
                datatable: {
                    columns: [
                        "actor_id",
                        "firstname",
                        "lastname",
                        "rank",
                        "experience",
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
                        lastname: '',
                        firstname: '',
                        middlename: '',
                        rank: '',
                        experience: '',
                    },
                },
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            async loadData(data = {}) {
                let dataSet = await api('actors/getAll', {
                    params: data
                });

                dataSet = dataSet.sort((a, b) => b.actor_id - a.actor_id).map(item => {
                    return {
                        actor_id: item.actor_id,
                        firstname: item.firstname,
                        lastname: item.lastname,
                        rank: item.rank,
                        experience: item.experience + ' лет',
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
                data.experience = parseInt(data.experience)

                await api('actors/create', data)

                this.$bvModal.hide('addActor');
                this.loadData();
            },

            validate() {
                return this.modals.add.state = this.$refs.addForm.checkValidity();
            },

            async remove(actor_id) {
                await api('actors/remove', {
                    actor_id
                })
                this.loadData()
            }
        }
    }
</script>
