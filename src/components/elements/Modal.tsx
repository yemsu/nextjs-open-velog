import styles from '@/styles/components/elements/Modal.module.scss'
import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean,
  title: string,
  toggle: () => void,
  children: ReactNode
};

export default function Modal (props: ModalProps) {
  const { isOpen, title, toggle, children } = props
  const { wrapper, modal, wrapTitle, modalTitle, wrapContent, buttonClose } = styles
  return (
    <>
      {isOpen && (
        <section className={wrapper} onClick={toggle}>
          <div onClick={(e) => e.stopPropagation()} className={modal}>
            <div className={wrapTitle}>
              <h2 className={modalTitle}>{title}</h2>
            </div>
            <div className={wrapContent}>{children}</div>
            <button className={buttonClose} onClick={toggle}>
              닫기
            </button>
          </div>
        </section>
      )}
    </>
  )
}
