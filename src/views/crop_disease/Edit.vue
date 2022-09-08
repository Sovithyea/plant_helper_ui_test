<template>
  <div>

    <v-card class="mb-3">
      <v-card-title>
        Diseases
      </v-card-title>
      <v-card-subtitle>
        Fill the below form to create new disease.
      </v-card-subtitle>
    </v-card>

    <v-card>
        <v-toolbar elevation="1">
            <a href="/crop-disease" style="text-decoration: none;" class="ml-2">
                <v-btn outlined color="blue" style="text-transform: capitalize;"> 
                    <v-icon>
                        mdi-keyboard-backspace
                    </v-icon>
                    Back
                </v-btn>
            </a>
        </v-toolbar>

        <v-form @submit.prevent="updateDisease" lazy-validation ref="form" enctype="multipart/form-data" class="mt-5">
          <v-card elevation="1">
            <v-card-subtitle>
              Thumbnail
              <v-divider class="my-5"/>
            </v-card-subtitle>
            <v-card-text class="text-center">
              <v-avatar style="width: 256px; height: 256px;">
                <v-img :src="`http://localhost:8000/storage/${form.avatar}`"/>
              </v-avatar>
            </v-card-text>
          </v-card>
            <v-col class="mt-5 pr-10 ml-3">
              <v-select
                label="Crop"
                v-model="form.crop_id"
                :items="crops"
                item-value="id"
                item-text="name"
                outlined
              >
              </v-select>
            </v-col>

            
            <v-col class="pr-10 ml-3"
              cols="12"
              lg="12"
            >
              <v-text-field
                :rules="[v => !!v || 'Please enter Disease name']"
                v-model="form.name"
                label="Disease Name"
                outlined
                clearable
              ></v-text-field>
            </v-col>

            <v-col  cols="12" md="12" class="ml-3 pr-10">

                <v-file-input
                    label="Disease avatar"
                    outlined
                    counter
                    v-model="form.image"
                    prepend-inner-icon="mdi-camera"
                    prepend-icon=""
                ></v-file-input>

            </v-col>

            <label class="ml-6">Diagosis Description (Optional)</label>

            <v-col  cols="12" md="12" class="ml-3 mt-3 pr-10 my-5">
              <ckeditor :editor="editor" v-model="form.diagnosis" tag-name="textarea" :config="editorConfig"></ckeditor>
            </v-col>

            <label class="ml-6">Cause Description (Optional)</label>
            
            <v-col  cols="12" md="12" class="ml-3 pr-10 my-5">
              <ckeditor :editor="editor" v-model="form.cause" :config="editorConfig"></ckeditor>
            </v-col>

            <label class="ml-6 my-5">Recommend Solution Description (Optional)</label>
            
            <v-col  cols="12" md="12" class="ml-3 pr-10 my-5">
              <ckeditor :editor="editor" v-model="form.solution" :config="editorConfig"></ckeditor>
            </v-col>

            <v-btn type="submit" style="text-transform: capitalize;" color="green" class="white--text ml-6 mb-10">
                Update diseases
            </v-btn>

            
        </v-form>
    </v-card>

  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  props: [
        'id'
      ],
    data() {
        return {
            editor: ClassicEditor,
            editorConfig: {
                // The configuration of the editor.
              },
            form: {
              
            },
            crops: [
              
            ]
        }
    },

    methods: {
            onChange(e) {
                this.form.image = e.target.files[0];
            },
            updateDisease(e) {
              console.log(this.form);
                if(this.$refs.form.validate()) {
                    console.log(this.form);
                    e.preventDefault();
                    let existingObj = this;
                    const token =  window.localStorage.getItem('accessToken')
                    const config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    params: {
                      '_method': 'PATCH'
                    }
                }
                
                    let data = new FormData();
                    data.append('name', this.form.name);
                    data.append('crop_id', this.form.crop_id);
                    if(this.form.image) 
                    {
                      data.append('image', this.form.image);
                    }
                    if(this.form.diagnosis) 
                    {
                      data.append('diagnosis', this.form.diagnosis);
                    }
                    if(this.form.cause) 
                    {
                      data.append('cause', this.form.cause);
                    }
                    if(this.form.solution) 
                    {
                      data.append('solution', this.form.solution);
                    }  
                    console.log(data);
                    // console.log([...data]);
                    this.axios.post('http://localhost:8000/api/crop-disease/' + this.form.id + '/update', data, config)
                    .then(function (res) {
                      existingObj.success = res.data.success;
                      existingObj.$router.push({name: 'cropDisease'});
                      console.log(res);
                    })
                    .catch(function (err) {
                      console.log(err);
                      existingObj.output = err;
                    });
                }
            },
            getText: (item) => `${item.name}`,

        },
      mounted() {
        const token =  window.localStorage.getItem('accessToken');
        this.axios.get('http://localhost:8000/api/crop-disease/'+ this.id + '/edit', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
          },    
        })
        .then(res => {
          console.log(res);
          this.form = res.data[0];
        })
        .catch(({res}) => {
          console.log(res);
        })
        .finally(() => {

        });

        this.axios.get('http://localhost:8000/api/crop-disease/create', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })   
            .then(response => {
                console.log(response);
                this.crops = response.data[0];
            })
            .catch(({response}) => {
                console.log(response);
            })
      },
}
</script>

<style>

  .ck-editor__editable_inline {
    min-height: 200px;
  }

</style>