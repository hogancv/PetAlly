<template>
    <div class="u-waterfall">
        <div id="u-left-column" class="u-column">
            <slot name="left" :leftList="leftList"></slot>
        </div>
        <div id="u-right-column" class="u-column">
            <slot name="right" :rightList="rightList"></slot>
        </div>
    </div>
</template>

<script>
    import { ref, watch, computed, onMounted } from 'vue';

    export default {
        name: "u-waterfall",
        props: {
            value: {
                type: Array,
                required: true,
                default: () => []
            },
            addTime: {
                type: [Number, String],
                default: 200
            },
            idKey: {
                type: String,
                default: 'id'
            }
        },
        setup(props, { emit }) {
            const leftList = ref([]);
            const rightList = ref([]);
            const tempList = ref([]);
            const copyFlowList = computed(() => cloneData(props.value));
            const cloneData = (data) => JSON.parse(JSON.stringify(data));

            watch(copyFlowList, (newVal, oldVal) => {
                let startIndex = Array.isArray(oldVal) && oldVal.length > 0 ? oldVal.length : 0;
                tempList.value = tempList.value.concat(cloneData(newVal.slice(startIndex)));
                splitData();
            });

            onMounted(() => {
                tempList.value = cloneData(copyFlowList.value);
                splitData();
            });

            const getRect = (selector) => {
                return new Promise((resolve) => {
                    const element = document.querySelector(selector);
                    if (element) {
                        resolve(element.getBoundingClientRect());
                    } else {
                        resolve({ height: 0 });
                    }
                });
            };
            const splitData = async () => {
                if (!tempList.value.length) return;
                let leftRect = await getRect('#u-left-column');
                let rightRect = await getRect('#u-right-column');
                let item = tempList.value[0];
                if (!item) return;
                if (leftRect.height < rightRect.height) {
                    leftList.value.push(item);
                } else if (leftRect.height > rightRect.height) {
                    rightList.value.push(item);
                } else {
                    if (leftList.value.length <= rightList.value.length) {
                        leftList.value.push(item);
                    } else {
                        rightList.value.push(item);
                    }
                }
                tempList.value.splice(0, 1);
                if (tempList.value.length) {
                    setTimeout(() => {
                        splitData();
                    }, props.addTime);
                }
            };


            const clear = () => {
                leftList.value = [];
                rightList.value = [];
                emit('update:value', []);
                tempList.value = [];
            };

            const remove = (id) => {
                let index = leftList.value.findIndex(val => val[props.idKey] == id);
                if (index != -1) {
                    leftList.value.splice(index, 1);
                } else {
                    index = rightList.value.findIndex(val => val[props.idKey] == id);
                    if (index != -1) rightList.value.splice(index, 1);
                }
                index = props.value.findIndex(val => val[props.idKey] == id);
                if (index != -1) emit('update:value', props.value.splice(index, 1));
            };

            const modify = (id, key, value) => {
                let index = leftList.value.findIndex(val => val[props.idKey] == id);
                if (index != -1) {
                    leftList.value[index][key] = value;
                } else {
                    index = rightList.value.findIndex(val => val[props.idKey] == id);
                    if (index != -1) rightList.value[index][key] = value;
                }
                index = props.value.findIndex(val => val[props.idKey] == id);
                if (index != -1) {
                    let data = cloneData(props.value);
                    data[index][key] = value;
                    emit('update:value', data);
                }
            };

            return {
                leftList,
                rightList,
                tempList,
                copyFlowList,
                splitData,
                cloneData,
                clear,
                remove,
                modify
            };
        }
    };
</script>

<style scoped>
    .u-waterfall {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
    }

    .u-column {
        flex: 1;
        flex-direction: column;
        height: auto;
    }

    .u-image {
        width: 100%;
    }
</style>