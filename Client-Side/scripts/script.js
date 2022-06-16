const DropBox = document.getElementById('dropbox-container');
const FileSelector = document.getElementById('file-selector');
const BrowseButton = document.getElementById('browse-button');
const ProgressContainer = document.getElementById('progress-container');
const UploadPercent = document.getElementById('upload-percent');
const ProgressBar = document.getElementById('progress-bar');
const BackgroundProgress = document.getElementById('background-progress');
const ExpireMessage = document.getElementById('expire-message');
const LinkBox = document.getElementById('link-box');
const LinkContainer = document.getElementById('link-container');
const LinkHolder = document.getElementById('link-holder');
const CopyButton = document.getElementById('copy-button');
const ToastContainer = document.getElementById('toast-container');
const ToastText = document.getElementById('toast-text');


const BaseURL = '';
const UploadURL = `${BaseURL}/upload/`;

const MaxAllowedFileSize = 25 * 1024 * 1024;

DropBox.addEventListener('dragover', (event) => {
    event.preventDefault();
    if (!DropBox.classList.contains('dragover')) {
        DropBox.classList.add('dragover');
    }

})

DropBox.addEventListener('dragleave', (event) => {
    event.preventDefault();
    DropBox.classList.remove('dragover');
})

DropBox.addEventListener('drop', (event) => {
    event.preventDefault();

    const files = event.dataTransfer.files;
    if (files.length === 1) {
        if (files[0].size < MaxAllowedFileSize) {
            FileSelector.files = files;
            UploadFile();
        }
        else {
            ShowToast('Maximum File Size is 25MB');
        }
    }
    else if (files.length > 1) {
        ShowToast('You Can Not Upload Multiple Files');
    }

    DropBox.classList.remove('dragover');
})

BrowseButton.addEventListener('click', (event) => {
    FileSelector.click();
})

CopyButton.addEventListener('click', (event) => {
    LinkHolder.select();
    document.execCommand('copy');
    ShowToast('Copied');
})

LinkHolder.addEventListener('click', (event) => {
    LinkHolder.select();
})

LinkHolder.addEventListener('focusin', (event) => {
    LinkContainer.classList.add('clicked');
})

LinkHolder.addEventListener('focusout', (event) => {
    LinkContainer.classList.remove('clicked');
})

FileSelector.addEventListener('change', (event) => {
    if (FileSelector.files[0].size > MaxAllowedFileSize) {
        ShowToast('Maximum File Size is 25MB');
        FileSelector.value = "";
        return;
    }
    UploadFile();
});

const UploadFile = function () {

    Files = FileSelector.files;
    const Data = new FormData();
    Data.append('myfile', Files[0]);

    LinkBox.style.display = 'none';
    ExpireMessage.style.display = 'none';
    LinkBox.style.transform = 'scale(0%)';
    ExpireMessage.style.transform = 'scale(0%)';
    ProgressContainer.style.transform = 'scale(100%)';

    setTimeout(() => {

        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = function (event) {
            let Percent = Math.round((event.loaded / event.total) * 100);
            UploadPercent.innerText = `${Percent}%`;
            BackgroundProgress.style.width = `${Percent}%`;
            ProgressBar.style.width = `${Percent}%`;
        };

        xhr.upload.onerror = function () {
            ShowToast('Error in Upload');
            FileSelector.value = "";
        };

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                FileUploadSuccess(xhr.responseText);
            }
        };

        xhr.open('POST', UploadURL);
        xhr.send(Data);
    }, 1000)

};

const FileUploadSuccess = (response) => {

    FileSelector.value = '';

    ProgressContainer.style.transform = 'scale(0%)';

    const { file: URL } = JSON.parse(response);

    LinkBox.style.display = 'flex';
    ExpireMessage.style.display = 'flex';

    setTimeout(() => {
        ExpireMessage.style.transform = 'scale(100%)';
        LinkBox.style.transform = 'scale(100%)';
    }, 1000);

    LinkHolder.value = URL;

};

const ShowToast = (message) => {

    let ToastTimer;
    clearTimeout(ToastTimer);
    ToastText.innerText = message;
    ToastContainer.classList.add('show-toast');
    ToastTimer = setTimeout(() => {
        ToastContainer.classList.remove('show-toast');
    }, 2000);

};
