var app = new function() {
  // jenis= masuk,keluar
  this.tabel = document.getElementById('data');
  this.id = [1,2,3];
  this.tanggal = ['2017-08-09','2017-08-09','2017-08-09'];
  this.uraian = ['tes1','tes2','tes3'];
  this.jumlah = [5000000,-1000000,-500000];
  this.jenis = ['Masuk','Keluar','Keluar'];

  this.sumSaldo = function() {
    var penerimaan=0,pengeluaran=0,saldo=0;
    for (var i = 0; i < this.id.length; i++) {
      if (this.jenis[i]==='Masuk'){penerimaan+=parseFloat(this.jumlah[i]);}
      else {pengeluaran+=parseFloat(this.jumlah[i]);}
    }
    saldo+=penerimaan+pengeluaran;
    document.getElementsByClassName('penerimaan')[0].innerHTML=this.formatCurrency(penerimaan,',','.');
    document.getElementsByClassName('pengeluaran')[0].innerHTML=this.formatCurrency(pengeluaran,',','.');
    document.getElementsByClassName('saldo')[0].innerHTML=this.formatCurrency(saldo,',','.');
  };

  this.TampilData = function() {
    var data = ''; //alert('tes3');
    if (this.id.length > 0) {
      for (var i = 0; i < this.id.length; i++) {
        data += '<tr>';
        data += '<td id="ratatengah">' + this.id[i] + '</td>';
        data += '<td>' + this.setDate(this.tanggal[i]) + '</td>';
        // data += '<td>' + this.tanggal[i] + '</td>';
        data += '<td>' + this.uraian[i] + '</td>';
        data += '<td id="ratakanan">'+ this.formatCurrency(this.jumlah[i],',','.') + '</td>';
        data += '<td id="ratatengah"><button onclick="app.EditData(' + i + ')">Edit</button></td>';
        data += '<td id="ratatengah"><button onclick="app.DeleteData(' + i + ')">Delete</button></td>';
        data += '<td id="ratatengah">' + this.jenis[i] + '</td>';
        data += '</tr>';
      }
    }
    this.sumSaldo();
    return this.tabel.innerHTML = data;
  };

  this.TambahData = function () {
    var formTambah=document.getElementById('form-tambah-data');
    if (document.getElementById('urut').value==''){alert('Nomor Urut Masih Kosong!'); return false}
    if (document.getElementById('tanggal').value==''){alert('Tanggal Masih Kosong!');return false}
    if (document.getElementById('uraian').value==''){alert('Uraian Masih Kosong!');return false}
    if (document.getElementById('jumlah').value==0){alert('Jumlah Nilai Anda Masih 0!');return false}

    this.id.push(document.getElementById('urut').value);
    this.tanggal.push(document.getElementById('tanggal').value);
    this.uraian.push(document.getElementById('uraian').value);
    this.jumlah.push(document.getElementById('jumlah').value);
    var j=document.getElementById('jenis1');
    this.jenis.push(j.options[j.selectedIndex].value);

    formTambah.reset();
    this.gantiMenu('tampil-data');
  };

  this.EditData = function(item){
    this.gantiMenu('edit-data');
    var i=0;
    if (this.jenis[item]==='Keluar'){i=1}
    document.getElementById('jenis2').options[i].selected=true;
    document.getElementById('urut2').value=this.id[item];
    document.getElementById('tanggal2').value=this.getDate(this.tanggal[item]);
    document.getElementById('uraian2').value=this.uraian[item];
    document.getElementById('jumlah2').value=this.jumlah[item].toString().replace('-','');
    document.getElementById('simpanEdit').setAttribute('onclick','app.simpanEditData('+item+')');
  }

  this.simpanEditData = function(item){
    var formEditData = document.getElementById('form-edit-data');
    if (document.getElementById('urut2').value==''){alert('Nomor Urut Masih Kosong!'); return false}
    if (document.getElementById('tanggal2').value==''){alert('Tanggal Masih Kosong!');return false}
    if (document.getElementById('uraian2').value==''){alert('Uraian Masih Kosong!');return false}
    if (document.getElementById('jumlah2').value==0){alert('Jumlah Nilai Anda Masih 0!');return false}

    this.id.splice(item, 1, document.getElementById('urut2').value);
    this.tanggal.splice(item, 1, document.getElementById('tanggal2').value);
    this.uraian.splice(item, 1, document.getElementById('uraian2').value);

    var jenis=document.getElementById('jenis2'),
    nilai=this.getValueCurrency(document.getElementById('jumlah2').value);
    if (jenis.options[jenis.selectedIndex].text==='Keluar') {
      this.jumlah.splice(item, 1, parseFloat(nilai*-1));
    } else {this.jumlah.splice(item, 1, parseFloat(nilai));}

    formEditData.reset();
    this.gantiMenu('tampil-data');
  };

  this.DeleteData = function (item) {
    this.id.splice(item, 1);
    this.tanggal.splice(item, 1);
    this.uraian.splice(item, 1);
    this.jumlah.splice(item, 1);
    this.gantiMenu('tampil-data');
  };

  this.gantiMenu = function(menu){
    if (menu == "tampil-data"){
      this.TampilData();
      document.getElementById('tambah-data').style="display:none;";
      document.getElementsByTagName('table')[0].style="display:fadeIn;";
      document.getElementById('edit-data').style="display:none;";//class="active"
      document.getElementById('about').style="display:none;";
      document.getElementById('nav-tampil-data').setAttribute("class","active");
      document.getElementById('nav-tambah-data').setAttribute("class","");
      document.getElementById('nav-about').setAttribute("class","");
    }
    else if (menu == "tambah-data"){
      document.getElementById('tambah-data').style="display:fadeIn;";
      document.getElementsByTagName('table')[0].style="display:none;";
      document.getElementById('edit-data').style="display:none;";
      document.getElementById('about').style="display:none;";
      document.getElementById('nav-tampil-data').setAttribute("class","");
      document.getElementById('nav-tambah-data').setAttribute("class","active");
      document.getElementById('nav-about').setAttribute("class","");
    }else if (menu == "edit-data"){
      document.getElementById('tambah-data').style="display:none;";
      document.getElementsByTagName('table')[0].style="display:none;";
      document.getElementById('edit-data').style="display:fadeIn;";
      document.getElementById('about').style="display:none;";
      document.getElementById('nav-tampil-data').setAttribute("class","");
      document.getElementById('nav-tambah-data').setAttribute("class","active");
      document.getElementById('nav-about').setAttribute("class","");
    }else if (menu == "tampil-about"){
      document.getElementById('tambah-data').style="display:none;";
      document.getElementsByTagName('table')[0].style="display:none;";
      document.getElementById('edit-data').style="display:none;";
      document.getElementById('about').style="display:fadeIn;";
      document.getElementById('nav-tampil-data').setAttribute("class","");
      document.getElementById('nav-tambah-data').setAttribute("class","");
      document.getElementById('nav-about').setAttribute("class","active");
    }
  }

  this.formatCurrency = function(amount, decimalSeparator, thousandsSeparator, nDecimalDigits){
    var num = parseFloat( amount ); //convert to float
    //default values
    decimalSeparator = decimalSeparator || '.';
    thousandsSeparator = thousandsSeparator || ',';
    nDecimalDigits = nDecimalDigits == null? 2 : nDecimalDigits;

    var fixed = num.toFixed(nDecimalDigits); //limit or add decimal digits
    //separate begin [$1], middle [$2] and decimal digits [$4]
    var parts = new RegExp('^(-?\\d{1,3})((?:\\d{3})+)(\\.(\\d{' + nDecimalDigits + '}))?$').exec(fixed);

    if(parts){ //num >= 1000 || num < = -1000
        return parts[1] + parts[2].replace(/\d{3}/g, thousandsSeparator + '$&') + (parts[4] ? decimalSeparator + parts[4] : '');
    }else{
        return fixed.replace('.', decimalSeparator);
    }
  }

  this.getValueCurrency = function(input){
    var x=input.replace('.',''),y=x.replace(',','.');
    return y;
  }

  this.isNumber = function(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  this.setDate = function(tggl) {
    var newStr=tggl.split('-');
    return newStr[2]+'-'+newStr[1]+'-'+newStr[0];
  }

  this.getDate = function(tggl) {
    var newStr=tggl.split('-');
    return newStr[0]+'-'+newStr[1]+'-'+newStr[2];
  }
}

app.TampilData();
