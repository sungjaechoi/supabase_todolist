import React from 'react'
import style from './skeleton.module.css'

export default function LoadingTodoList() {
  return (
    <>
      <div className={style.skeleton_container}>
        <div className={style.skeleton_title}></div>
        <ul className={style.skeleton_ul}>
          <li className={style.skeleton_todo_item}></li>
          <li className={style.skeleton_todo_item}></li>
          <li className={style.skeleton_todo_item}></li>
          <li className={style.skeleton_todo_item}></li>
        </ul>
      </div>
      <div className={style.skeleton_container}>
        <div className={style.skeleton_title}></div>
        <ul className={style.skeleton_ul}>
          <li className={style.skeleton_todo_item}></li>
          <li className={style.skeleton_todo_item}></li>
          <li className={style.skeleton_todo_item}></li>
          <li className={style.skeleton_todo_item}></li>
          <li className={style.skeleton_todo_item}></li>
        </ul>
      </div>
      <div className={style.skeleton_container}>
        <div className={style.skeleton_title}></div>
        <ul className={style.skeleton_ul}>
          <li className={style.skeleton_todo_item}></li>
          <li className={style.skeleton_todo_item}></li>
          <li className={style.skeleton_todo_item}></li>
          <li className={style.skeleton_todo_item}></li>
        </ul>
      </div>
      <div className={style.skeleton_container}>
        <div className={style.skeleton_title}></div>
        <ul className={style.skeleton_ul}>
          <li className={style.skeleton_todo_item}></li>
          <li className={style.skeleton_todo_item}></li>
          <li className={style.skeleton_todo_item}></li>
          <li className={style.skeleton_todo_item}></li>
        </ul>
      </div>
    </>
  )
}
