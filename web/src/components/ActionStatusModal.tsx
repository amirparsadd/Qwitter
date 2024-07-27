import Modal from "react-responsive-modal"

type ModalResult = {
  status: string,
  message: string
}

export type ContentState = "SUCCESS" | "FAIL"

type Props = {
  state: boolean,
  contentState: ContentState,
  result: ModalResult,
  onClose: () => void,
  successMessage: string
}

function ActionStatusModal({state, contentState, result, onClose, successMessage}: Props) {

  return (
    <Modal onClose={onClose} open={state} center>
        <h1>
          {
            contentState == "SUCCESS"
              ? "Success"
              : `Error - ${result.status}`
          }
        </h1>
        <h2>
          {
            result.message == "SUCCESS"
              ? successMessage
              : result.message
          }
        </h2>
      </Modal>
  )
}

export default ActionStatusModal