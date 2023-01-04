<template>
  <div>
    <div class="header">
      <h2>Add Your Post</h2>
    </div>
    <hr />

    <input
      ref="input"
      type="file"

      name="image"
      accept="image/*"
      @change="setImage"
    />

    <div class="content">
      <section class="cropper-area">
        <div class="img-cropper">
          <vue-cropper
            ref="cropper"
            :src="imgSrc"
            preview=".preview"
            :viewMode="3"
            :zoomable="false"
            :aspectRatio="1/1"
          />
        </div>
         <div class="form-group">
    <label>Title
      <input v-model="title" type="text" class="form-control">
    </label>
    <label>Description
      <input v-model="content" type="text" class="form-control">
    </label>
        <div class="actions">
          <a
            href="#"
            role="button"
            @click.prevent="cropImage"
          >
            See Crop Image
          </a>
          <a
            href="#"
            role="button"
            @click.prevent="showFileChooser"
          >
            Choose Image
          </a>
           <a
            href="#"
            @click="add()"
          >
            Add post 
          </a>
        </div>
        </div>

        
      </section>
      <section class="preview-area">
        <p>Preview</p>
        <div class="preview" />
        <p>Cropped Image</p>
        <div class="cropped-image">
          <img
            v-if="cropImg"
            :src="cropImg"
            alt="Cropped Image"
          />
          <div v-else class="crop-placeholder" />
        </div>
      </section>
    </div>

  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {

  components: {
    VueCropper,
  },
  data() {
    return {
      imgSrc: 'https://images.unsplash.com/photo-1568595502714-5a8aa68c5fd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      cropImg: '',
      file: '',
      data: null,
      title: '',
      content: ''
    };
  },
  methods: {
    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.file = this.$refs.input.files[0]
      this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
        let i = new FormData()
        i.append('picture', blob)    
      }
      )
    },


     add() {
      this.file = this.$refs.input.files[0]
      this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
        let i = new FormData()
        i.append('picture', blob)    
        var file = new File([blob], "my_image.jpg",{type:"image/jpg", lastModified:new Date().getTime()})
        this.$store.dispatch('post/post/addPosts', { file: file, title: this.title, content: this.content })
      }
      )
    },
    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute('data-scale', scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute('data-scale');
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute('data-scale', scale);
    },
    getCropBoxData() {
      this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
    },
    getData() {
      this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
    },
    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    setCropBoxData() {
      if (!this.data) return;

      this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
    },
    setData() {
      if (!this.data) return;

      this.$refs.cropper.setData(JSON.parse(this.data));
    },
    setImage(e) {
      alert(e)
      const file = e.target.files[0];

      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file');
        return;
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader();

        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        alert('Sorry, FileReader API not supported');
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cropper-crop-box, .cropper-view-box {
    border-radius: 50%;
}

.cropper-view-box {
    box-shadow: 0 0 0 1px #39f;
    outline: 0;
}

.cropper-face {
  background-color:inherit !important;
}

.cropper-dashed, .cropper-point.point-se, .cropper-point.point-sw, .cropper-point.point-nw,   .cropper-point.point-ne, .cropper-line {
  display:none !important;
}

.cropper-view-box {
  outline:inherit !important;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  width: 1024px;
  margin: 0 auto;
}

input[type="file"] {
  display: none;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}

.header h2 {
  margin: 0;
}

.header a {
  text-decoration: none;
  color: black;
}

.content {
  display: flex;
  justify-content: space-between;
}

.cropper-area {
  width: 614px;
}

.actions {
  margin-top: 1rem;
}

.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #0062CC;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

textarea {
  width: 100%;
  height: 100px;
}

.preview-area {
  width: 307px;
}

.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
}

.preview-area p:last-of-type {
  margin-top: 1rem;
}

.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}

.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}

.cropped-image img {
  max-width: 100%;
}
@media (max-width:500px){
  .content{
  display:flex;
  flex-direction:column;
  }
  .form-group{
  display:flex;
  flex-direction:column;
  }
  .form-group input{
  width:300px;
  }
  .actions{
  display:flex;
  flex-direction:column;
  width:300px;
  }
  .img-cropper{
  width:55% !important;
  }
  .cropper-area{
  width:50%;
  }
  .img-cropper img{
  width:100%;
  }
}
</style>