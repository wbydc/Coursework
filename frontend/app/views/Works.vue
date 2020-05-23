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
                    <b-button variant="outline-primary" @click="remove(props.row.actor_id, props.row.role_id)">
                        <b-icon-trash />
                    </b-button>
                </div>
            </template>
        </v-client-table>

        <b-modal id="addWork" size="lg" centered title="Добавить занятость" @ok="addok">
            <b-form ref="addForm" @submit.stop.prevent="add" invalid-feedback="Все поля обязательны для заполнения">
                <b-form-group size="md" label="Актёр">
                    <b-form-select v-model="modals.add.actor_id" :options="modals.add.actors">
                    </b-form-select>
                </b-form-group>
                <b-form-group size="md" label="Роль">
                    <b-form-select v-model="modals.add.role_id" :options="modals.add.roles">
                    </b-form-select>
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
                        text: 'Занятость актёров',
                        href: '/roles',
                        active: true
                    }
                ],
                datatable: {
                    columns: [
                        "actor",
                        "role_title",
                        "base_salary",
                        "expirience_bonus",
                        "show_name",
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
                        actors: [],
                        actor_id: null,
                        roles: [],
                        role_id: null,
                    },
                },
            }
        },
        mounted() {
            this.loadData()
        },
        methods: {
            async loadData(data = {}) {
                let dataSet = await api('works/getAll', {
                    params: data
                });

                dataSet = dataSet.sort((a, b) => b.role_id - a.role_id).map(item => {
                    return {
                        actor: item.actor,
                        role_title: item.role,
                        base_salary: item.salary + ' рублей',
                        expirience_bonus: item.bonus + ' рублей',
                        show_name: item.name + ' от ' + new Date(item.date * 1000).toLocaleDateString(),
                        actions: ''
                    }
                })

                this.datatable.data = dataSet
            },

            async preadd() {
                let actors = await api('actors/getList')
                let roles = await api('roles/getList')
                this.modals.add.actors = actors.map(actor => ({
                    value: actor.actor_id,
                    text: actor.name,
                }))
                this.modals.add.roles = roles.map(role => ({
                    value: role.role_id,
                    text: role.role + ' от ' + new Date(role.date * 1000).toLocaleDateString(),
                }))
                this.$bvModal.show('addWork')
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
                    actor_id: parseInt(this.modals.add.actor_id),
                    role_id: parseInt(this.modals.add.role_id)
                }
                
                await api('works/create', data)

                this.$bvModal.hide('addWork');
                this.loadData();
            },

            validate() {
                return this.modals.add.state = this.$refs.addForm.checkValidity();
            },

            async remove(actor_id, role_id) {
                await api('works/remove', {
                    actor_id,
                    role_id
                })
                this.loadData()
            }
        }
    }
</script>
