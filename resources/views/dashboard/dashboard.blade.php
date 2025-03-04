@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
<h2>Selamat Datang, {{ auth()->user()->name }}</h2>
@if(auth()->user()->can('create-user'))
    <p>Anda memiliki akses untuk mengelola pengguna.</p>
@endif
@endsection
